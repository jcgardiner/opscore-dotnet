import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  title = 'OpsCore';
  currentUser: any = null;
  isAuthPage = false;

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Sites', path: '/sites', icon: '🏭' },
    { label: 'Assets', path: '/assets', icon: '🔧' },
    { label: 'Personnel', path: '/personnel', icon: '👤' },
    { label: 'Inspections', path: '/inspections', icon: '✅' },
    { label: 'Work Orders', path: '/work-orders', icon: '📋' },
    { label: 'Incidents', path: '/incidents', icon: '⚠️' },
    { label: 'Analytics', path: '/analytics', icon: '📈' }
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAuthPage = event.url === '/login';
      this.currentUser = this.authService.getCurrentUser();
    });
    this.isAuthPage = this.router.url === '/login';
  }

  logout(): void {
    this.authService.logout();
  }
}