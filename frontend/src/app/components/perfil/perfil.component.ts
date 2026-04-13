import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule, TranslatePipe],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private langService = inject(LanguageService);

  user = this.authService.currentUser$;
  editMode = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  editForm!: FormGroup;

  allUsers: any[] = [];
  isAdmin = false;
  showAddUserForm = false;
  registerUserForm!: FormGroup;

  ngOnInit() {
    const u = this.authService.currentUserValue;
    this.isAdmin = u?.role === 'admin';

    this.editForm = this.fb.group({
      username:           [u?.username || '',     Validators.required],
      name:               [u?.name || '',         Validators.required],
      lastname:           [u?.lastname || ''],
      email:              [u?.email || '',         [Validators.required, Validators.email]],
      phone:              [u?.phone || ''],
      date_of_birth:      [u?.date_of_birth || ''],
      nationality:        [u?.nationality || ''],
      passport_number:    [u?.passport_number || ''],
      emergency_contact:  [u?.emergency_contact || ''],
      destination_country:[u?.destination_country || ''],
      passport_expiry:    [u?.passport_expiry || ''],
      preferred_language: [u?.preferred_language || ''],
      address:            [u?.address || ''],
      city:               [u?.city || ''],
      postal_code:        [u?.postal_code || ''],
      gender:             [u?.gender || ''],
      password:           [''],
    });

    if (this.isAdmin) {
      this.authService.getUsers().subscribe((users: any[]) => this.allUsers = users);
      
      this.registerUserForm = this.fb.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  }

  openEdit() {
    this.editMode = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  cancelEdit() {
    this.editMode = false;
    const u = this.authService.currentUserValue;
    this.editForm.patchValue({
      username: u?.username,
      name: u?.name, lastname: u?.lastname, email: u?.email,
      phone: u?.phone, date_of_birth: u?.date_of_birth,
      nationality: u?.nationality, passport_number: u?.passport_number,
      emergency_contact: u?.emergency_contact,
      destination_country: u?.destination_country,
      passport_expiry: u?.passport_expiry,
      preferred_language: u?.preferred_language,
      address: u?.address,
      city: u?.city,
      postal_code: u?.postal_code,
      gender: u?.gender,
      password: ''
    });
  }

  saveProfile() {
    if (this.editForm.invalid) return;
    this.loading = true;
    const userId = this.authService.currentUserValue?.id;

    if (!userId) {
      this.errorMessage = this.langService.t('profile.sessionExpired');
      this.authService.logout();
      return;
    }

    const payload = { ...this.editForm.value };

    Object.keys(payload).forEach(key => {
      if (payload[key] === '' || payload[key] === undefined) {
        payload[key] = null;
      }
    });

    if (payload.password === null) delete payload.password;

    this.authService.updateProfile(userId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.editMode = false;
        this.successMessage = this.langService.t('profile.successMsg');
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 401) {
          this.errorMessage = this.langService.t('profile.sessionExpiredShort');
          this.authService.logout();
        } else {
          this.errorMessage = err?.error?.message || this.langService.t('profile.updateError');
        }
      }
    });
  }

  deleteUser(userId: number) {
    if (!confirm(this.langService.t('profile.confirmDeleteUser'))) return;
    
    this.authService.deleteAccount(userId).subscribe({
      next: () => {
        this.allUsers = this.allUsers.filter(u => u.id !== userId);
        this.successMessage = this.langService.t('profile.userDeleted');
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Error';
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  toggleAddUser() {
    this.showAddUserForm = !this.showAddUserForm;
    this.successMessage = '';
    this.errorMessage = '';
    if (this.showAddUserForm) {
      this.registerUserForm.reset();
    }
  }

  addUser() {
    if (this.registerUserForm.invalid) return;
    this.loading = true;

    // Use a modified register call that doesn't switch the current user
    // We can do this by just calling the API directly or adding a flag to AuthService
    const userData = this.registerUserForm.value;
    
    this.authService.createUser(userData).subscribe({
      next: () => {
        this.loading = false;
        this.showAddUserForm = false;
        // Refresh user list
        this.authService.getUsers().subscribe(users => this.allUsers = users);
        this.successMessage = this.langService.t('profile.userAddedSuccess');
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Error';
      }
    });
  }
}
