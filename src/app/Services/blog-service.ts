import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../Entities/Blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = "https://localhost:7085/api/v1.0";

  constructor(private http: HttpClient){}

  getAllBlogsByUserId(userId: number): Observable<any>{
      return this.http.get(`${this.apiUrl}/blogsite/user/getall?userId=${userId}`);
  }

  addBlog(blog: Blog): Observable<any>{
    return this.http.post(`${this.apiUrl}/blogsite/user/blogs/add/<blogname>`, 
      blog, 
      {responseType: 'text'});
  }

  updateBlog(blog: Blog): Observable<any>{
    return this.http.put(`${this.apiUrl}/blogsite/user/blogs/update/<id>?blogId=${blog.blogId}`, 
      blog, 
      {responseType: 'text'});
  }

  deleteBlog(blog: Blog): Observable<any>{
    return this.http.delete(`${this.apiUrl}/blogsite/user/delete/<blogname>?blogName=${blog.blogName}&authorId=${blog.authorId}`, 
      {responseType: 'text'});
  }
}
