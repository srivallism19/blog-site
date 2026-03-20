import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../Services/auth-service';
import { User } from '../Entities/User';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService){
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
          this.authService.login(response.jwtToken);
          alert(response.message);
        },
        error: (resp) =>{
          alert(resp.message);
        }
      })
    }
  }
}
