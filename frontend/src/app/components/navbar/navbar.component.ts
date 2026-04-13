import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService, Lang } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly langService = inject(LanguageService);

  user = this.authService.currentUser$;

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  setLang(lang: Lang) {
    this.langService.setLanguage(lang);
  }

  get currentLang() {
    return this.langService.currentLang();
  }
}
