import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../Entities/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = "https://localhost:7085/api/v1.0";
  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient){}

  registerUser(userReq: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/blogsite/user/register`, userReq);
  }

  loginUser(userReq: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/blogsite/user/login`, userReq);
  }

  login(token: string, userId: number){
    sessionStorage.setItem('jwtToken', token);
    sessionStorage.setItem('userId', userId.toString());
    this.loggedIn.next(true);
  }

  isUserLoggedIn() : boolean {
    return !!sessionStorage.getItem('jwtToken');
  }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('userId');
    this.loggedIn.next(false);
  }
}
