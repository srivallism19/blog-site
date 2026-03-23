import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../Services/blog-service';
import { Blog } from '../Entities/Blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './blog-search.html',
  styleUrl: './blog-search.css',
})
export class BlogSearch {
  category: string="";
  startDate: string="";
  endDate: string="";
  blogs:Blog [] = [];

  constructor(private blogService: BlogService, private cd: ChangeDetectorRef){}

  getBlogsByCategory(){
    if(this.category && this.startDate && this.endDate){
      this.blogService.getBlogsByCategoryDuration(this.category, this.startDate, this.endDate).subscribe({
        next: (response) => {
          this.blogs = response;
          this.cd.detectChanges();
        },
        error: (resp) => {
          console.error("Error fetching blogs", resp);
        }
      })
    }

    else{
      this.blogService.getBlogsByCategory(this.category).subscribe({
        next: (response) => {
          this.blogs = response;
          this.cd.detectChanges();
        },
        error: (resp) => {
          console.error("Error fetching blogs", resp);
        }
      })
    }
  }
}
