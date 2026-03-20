import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { NgModule } from '@angular/core';
import { Login } from './login/login';
import { BlogList } from './blog-list/blog-list';

export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'register', component: Register},
    {path: 'login', component: Login},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'blog-list', component: BlogList}
];