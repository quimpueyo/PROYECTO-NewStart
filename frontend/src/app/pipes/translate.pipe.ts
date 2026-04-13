import { Pipe, PipeTransform, inject, ChangeDetectorRef } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { effect } from '@angular/core';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  private langService = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    // Re-run change detection whenever the language signal changes
    effect(() => {
      this.langService.currentLang(); // subscribe to signal
      this.cdr.markForCheck();
    });
  }

  transform(key: string): string {
    return this.langService.t(key);
  }
}
