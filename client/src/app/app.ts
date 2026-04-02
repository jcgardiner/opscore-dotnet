import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'OpsCore';

  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Sites', path: '/sites', icon: '🏭' },
    { label: 'Assets', path: '/assets', icon: '🔧' },
    { label: 'Personnel', path: '/personnel', icon: '👤' },
    { label: 'Inspections', path: '/inspections', icon: '✅' },
    { label: 'Work Orders', path: '/work-orders', icon: '📋' },
    { label: 'Incidents', path: '/incidents', icon: '⚠️' }
  ];
}