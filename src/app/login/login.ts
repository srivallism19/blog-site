import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router){
    this.loginForm = this.fb.nonNullable.group({
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }
  
  onSubmit(){
    if(this.loginForm.valid){
      const req: any = {
        userEmail : this.loginForm.value.emailId,
        password : this.loginForm.value.password
      };

      this.authService.loginUser(req).subscribe({
        next: (response) => {
          this.authService.login(response.jwtToken, response.userId);
          alert(response.message);
          const userId = sessionStorage.getItem("userId");
          this.router.navigate(['/blog-list', userId]);
        },
        error: (resp) =>{
          alert(resp.message);
        }
      })
    }
  }
}
