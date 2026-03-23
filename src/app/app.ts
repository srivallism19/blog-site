import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './header/header';
import { Register } from './register/register';
import { Login } from './login/login';
import { BlogList } from './blog-list/blog-list';
import { BlogSearch } from './blog-search/blog-search';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Register, Login, BlogList, BlogSearch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('blog-site');
}
