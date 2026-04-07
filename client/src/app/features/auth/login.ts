import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  email = '';
  password = '';
  error = '';
  loading = false;
  mode: 'login' | 'register' = 'login';

  firstName = '';
  lastName = '';
  confirmPassword = '';

  onSubmit(): void {
    this.error = '';
    this.loading = true;

    if (this.mode === 'login') {
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = 'Invalid email or password.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }
      this.authService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = 'Registration failed. Email may already be in use.';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  toggleMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.error = '';
    this.cdr.detectChanges();
  }
}
