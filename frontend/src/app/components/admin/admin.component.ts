import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NavbarComponent, TranslatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private apiService = inject(ApiService);

  activeTab: 'users' | 'accommodations' | 'activities' = 'users';

  users: any[] = [];
  accommodations: any[] = [];
  activities: any[] = [];
  
  showAddUserModal = false;
  newUser = { username: '', name: '', lastname: '', email: '', password: '', destination_country: '' };

  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.loadAll();
  }

  // Better to just set loading to false in a finally block to ensure it always finishes.
  loadAll() {
    this.loading = true;
    this.errorMessage = '';
    
    // Keep it simple and reliable. We just track completed requests.
    let completed = 0;
    const checkDone = () => {
      completed++;
      if (completed >= 3) {
        this.loading = false;
      }
    };

    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data || [];
        checkDone();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load users: ' + (err.error?.message || 'Access denied');
        checkDone();
      }
    });

    this.apiService.getDestinations().subscribe({
      next: (data) => {
        this.accommodations = data || [];
        checkDone();
      },
      error: (err) => {
        console.error('Error fetching destinations', err);
        checkDone();
      }
    });

    this.apiService.getServices().subscribe({
      next: (data) => {
        this.activities = data || [];
        checkDone();
      },
      error: (err) => {
        console.error('Error fetching services', err);
        checkDone();
      }
    });
  }

  // Remove the old checkLoading method


  switchTab(tab: 'users' | 'accommodations' | 'activities') {
    this.activeTab = tab;
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteAccount(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
        },
        error: (err) => alert('Error deleting user: ' + (err.error?.message || 'Unauthorized'))
      });
    }
  }

  deleteAccommodation(id: number) {
    if (confirm('Are you sure you want to delete this destination?')) {
      this.apiService.deleteDestination(id).subscribe({
        next: () => {
          this.accommodations = this.accommodations.filter(a => a.id !== id);
        },
        error: (err) => alert('Error deleting destination')
      });
    }
  }

  deleteActivity(id: number) {
    if (confirm('Are you sure you want to delete this service?')) {
      this.apiService.deleteService(id).subscribe({
        next: () => {
          this.activities = this.activities.filter(a => a.id !== id);
        },
        error: (err) => alert('Error deleting service')
      });
    }
  }

  submitNewUser() {
    this.authService.createUser(this.newUser).subscribe({
      next: (res) => {
        alert('User created successfully!');
        this.showAddUserModal = false;
        this.newUser = { username: '', name: '', lastname: '', email: '', password: '', destination_country: '' };
        this.loadAll(); // Refresh list
      },
      error: (err) => {
        alert('Error creating user: ' + JSON.stringify(err.error));
      }
    });
  }
}
