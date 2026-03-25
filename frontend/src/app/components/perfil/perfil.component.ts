import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class PerfilComponent implements OnInit {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  user = this.authService.currentUser$;
  editMode = false;
  loading = false;
  successMessage = '';
  errorMessage = '';

  editForm!: FormGroup;

  ngOnInit() {
    const u = this.authService.currentUserValue;
    this.editForm = this.fb.group({
      name:               [u?.name || '',         Validators.required],
      lastname:           [u?.lastname || ''],
      email:              [u?.email || '',         [Validators.required, Validators.email]],
      phone:              [u?.phone || ''],
      date_of_birth:      [u?.date_of_birth || ''],
      nationality:        [u?.nationality || ''],
      passport_number:    [u?.passport_number || ''],
      emergency_contact:  [u?.emergency_contact || ''],
      destination_country:[u?.destination_country || ''],
      password:           [''],
    });
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
      name: u?.name, lastname: u?.lastname, email: u?.email,
      phone: u?.phone, date_of_birth: u?.date_of_birth,
      nationality: u?.nationality, passport_number: u?.passport_number,
      emergency_contact: u?.emergency_contact,
      destination_country: u?.destination_country,
      password: ''
    });
  }

  saveProfile() {
    if (this.editForm.invalid) return;
    this.loading = true;
    const userId = this.authService.currentUserValue?.id;
    const payload = { ...this.editForm.value };
    if (!payload.password) delete payload.password;

    this.authService.updateProfile(userId, payload).subscribe({
      next: () => {
        this.loading = false;
        this.editMode = false;
        this.successMessage = '¡Perfil actualizado correctamente!';
        setTimeout(() => this.successMessage = '', 4000);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Error al actualizar el perfil.';
      }
    });
  }
}
