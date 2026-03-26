import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../Services/blog-service';
import { Blog } from '../Entities/Blog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList {
  public userId: number = 0;
  public blogs: Blog[] = [];
  public blogForm !: FormGroup;
  public editForm !: FormGroup;
  public showAddOverlay = false;
  public showEditOverlay = false;
  public showDeleteOverlay = false;
  public loading = false;
  selectedBlog: Blog | null = null;

  constructor(private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId');
      if (userId) {
        this.userId = Number(userId);
        this.loadBlogs(this.userId);
      }
    });

    //Initialise Reactive Form for Create blog
    this.blogForm = this.fb.group({
      BlogName: ['', [Validators.required, Validators.minLength(20)]],
      Category: ['', [Validators.required, Validators.minLength(20)]],
      Article: ['', [Validators.required, Validators.minLength(10)]],
      AuthorId: [this.userId],
      CreatedDateTime: [new Date()]
    });

    this.editForm = this.fb.group({
      BlogName: ['', [Validators.required]],
      Category: ['', [Validators.required]],
      Article: ['', [Validators.required]]
    });

  }

  loadBlogs(userId: number) {
    this.blogService.getAllBlogsByUserId(userId).subscribe({
      next: (response) => {
        this.blogs = response;
        this.cd.detectChanges();
      },
      error: (resp) => {
        console.error("Error fetching blogs", resp);
      }
    })
  }

  onCreateBlogClick() {
    this.showAddOverlay = true;
    this.blogForm.reset({
      AuthorId: this.userId,
      CreatedDateTime: new Date()
    });
  }

  saveBlog() {
    if (this.blogForm.valid) {
      this.loading = true;
      const req: Blog = {
        blogId: 0,
        blogName: this.blogForm.value.BlogName,
        category: this.blogForm.value.Category,
        article: this.blogForm.value.Article,
        authorId: this.blogForm.value.AuthorId,
        authorName: "",
        createdDateTime: this.blogForm.value.CreatedDateTime
      };

      this.blogService.addBlog(req).subscribe({
        next: (response) => {
          this.loadBlogs(this.userId);
          alert(response);
          this.loading = false;
        },
        error: (res) => {
          alert(res);
          this.loading = false;
        }
      });
      this.showAddOverlay = false;
    }
  }

  onEditClick(blog: Blog) {
    this.selectedBlog = blog;
    this.showEditOverlay = true;
    this.editForm.patchValue({
      BlogName: blog.blogName,
      Category: blog.category,
      Article: blog.article
    });

  }

  editBlog() {
    if (this.selectedBlog) {
      const updatedBlog: Blog = {
        ...this.selectedBlog,
        ...this.editForm.value
      };

      this.blogService.updateBlog(updatedBlog).subscribe({
        next: (response) => {
          this.loadBlogs(this.userId);
          alert(response);
        },
        error: (res) => {
          alert(res);
        }
      });
      this.showEditOverlay = false;
    }
  }

  onDeleteClick(blog: Blog) {
    this.selectedBlog = blog;
    this.showDeleteOverlay = true;
  }

  deleteBlog(selectedBlog: Blog) { 
    this.blogService.deleteBlog(selectedBlog).subscribe({
      next: (response) => {
        this.loadBlogs(this.userId);
        alert(response);
      },
      error: (res) => {
        alert(res);
      }
    });
    this.showDeleteOverlay = false;
  }

  cancelOverlay(): void {
    this.showAddOverlay = false;
    this.showEditOverlay = false;
    this.showDeleteOverlay = false;
  }
}
