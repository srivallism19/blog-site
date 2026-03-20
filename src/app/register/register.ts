import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../Entities/User';
import { AuthService } from '../Services/auth-service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup;


  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.nonNullable.group({
      username: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.pattern(/^[^@]+@[^@]+\.[Cc][oO][mM]$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*[0-9]).{8,}$/)]],
      confirmPwd: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pwd = control.get('password')?.value;
    const confirmPwd = control.get('confirmPwd')?.value;
    return pwd === confirmPwd ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const req: User = {
        userId: 0,
        userName: this.registerForm.value.username,
        userEmail: this.registerForm.value.emailId,
        password: this.registerForm.value.password
      };

      this.authService.registerUser(req).subscribe({
        next: (response) => {
          alert("User is registered successfully");
        },
        error: (error) => {
          alert("User Registration is failed. Please try again");
        }
      });
    }
  }

}
