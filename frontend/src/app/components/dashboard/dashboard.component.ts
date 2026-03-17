import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService, Service, Plan } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);
  private router = inject(Router);

  user = this.authService.currentUser$;
  services = signal<Service[]>([]);
  plans = signal<Plan[]>([]);

  ngOnInit() {
    this.apiService.getServices().subscribe(data => this.services.set(data));
    this.apiService.getPlans().subscribe(data => this.plans.set(data));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
