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
  public showOverlay = false;
  public loading = false;

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
    })
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

  openCreateBlog() {
    this.showOverlay = true;
    this.blogForm.reset({
      AuthorId: this.userId,
      CreatedDateTime: new Date()
    });
  }

  editBlog(blog: Blog) { }

  deleteBlog(blogId: any) { }

  saveBlog() {
    if (this.blogForm.valid) {
      const req: Blog = {
        blogId: 0,
        blogName: this.blogForm.value.BlogName,
        category: this.blogForm.value.Category,
        article: this.blogForm.value.Article,
        authorId: this.blogForm.value.AuthorId,
        createdDateTime: this.blogForm.value.CreatedDateTime
      };

      this.blogService.addBlog(req).subscribe({
        next: (response) => {
          this.loadBlogs(this.userId);
          alert("Blog is added successfully");
        },
        error: (error) => {
          alert("Blog is failed. Please try again");
        }
      });
      this.showOverlay = false;
    }
  }

  cancelOverlay(): void {
    this.showOverlay = false;
  }
}
