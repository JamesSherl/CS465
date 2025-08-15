import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  public formError: string = '';
  submitted = false;

  // 'login' | 'register'
  mode: 'login' | 'register' = 'login';

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  // Registration extras
  confirmPassword = '';
  agreedToTerms = false;

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  ngOnInit(): void {}

  setMode(m: 'login' | 'register') {
    this.mode = m;
    this.formError = '';
  }

  // Unified submit for both modes
  public onSubmit(): void {
    this.formError = '';

    if (this.mode === 'login') {
      // Minimal required fields for login
      if (!this.credentials.email || !this.credentials.password) {
        this.formError = 'Email and password are required.';
        return;
      }
      this.doLogin();
      return;
    }

    // Registration validation
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required.';
      return;
    }
    if (this.credentials.password !== this.confirmPassword) {
      this.formError = 'Passwords do not match.';
      return;
    }
    if (!this.agreedToTerms) {
      this.formError = 'You must agree to the Terms of Use and Privacy Policy.';
      return;
    }

    this.doRegister();
  }

private doRegister(): void {
  const user = { name: this.credentials.name, email: this.credentials.email } as User;
  this.authenticationService.register(user, this.credentials.password).subscribe({
    next: () => {
      // (optional) auto-login already handled via token above
      this.router.navigate(['']);
    },
    error: (err) => {
      this.formError = err?.error?.message || 'Registration failed.';
    }
  });
}

private doLogin(): void {
  const user = { email: this.credentials.email } as User;
  this.authenticationService.login(user, this.credentials.password).subscribe({
    next: () => this.router.navigate(['']),
    error: (err) => this.formError = err?.error?.message || 'Login failed.'
  });
}

}
