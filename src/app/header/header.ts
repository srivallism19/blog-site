import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../Services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(public router: Router, public authService: AuthService){}

  goToRegister(){
    this.router.navigate(['/register']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  isUserLoggedIn() : boolean {
    return this.authService.isUserLoggedIn();
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  goToBlog(){
    const userId = sessionStorage.getItem("userId");
    this.router.navigate(['/blog-list', userId]);
  }

  goToAllBlogs(){
    this.router.navigate(['/app-blog-search']);
  }
}
