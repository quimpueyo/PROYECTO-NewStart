import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { Service } from '../../models/service';
import { Plan } from '../../models/plan';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
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
    this.apiService.getServices().subscribe((data: Service[]) => this.services.set(data));
    this.apiService.getPlans().subscribe((data: Plan[]) => this.plans.set(data));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
