import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { FormsModule } from '@angular/forms';

export interface Suggestion {
  name: string;
  type: 'city' | 'country';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, TranslatePipe, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);
  readonly langService = inject(LanguageService);

  showDestinations = false;
  showCountrySelection = false;
  currentDestIndex = 0;
  searchTerm: string = '';
  suggestions: Suggestion[] = [];

  destinations: any[] = [];

  // mapping all potential raw names (from any language the API might return) to a single key
  private nameMap: Record<string, string> = {
    // Germany
    'germany': 'dest.germany', 'alemania': 'dest.germany', 'alemanya': 'dest.germany',
    'munich': 'dest.munich', 'múnich': 'dest.munich', 'munic': 'dest.munich',
    'berlin': 'dest.berlin', 'berlín': 'dest.berlin',
    'bremen': 'dest.bremen',
    'lubeck': 'dest.lubeck', 'lübeck': 'dest.lubeck',
    // Norway
    'norway': 'dest.norway', 'noruega': 'dest.norway',
    'oslo': 'dest.oslo',
    // UK
    'united kingdom': 'dest.uk', 'reino unido': 'dest.uk', 'regne unit': 'dest.uk', 'uk': 'dest.uk',
    'london': 'dest.london', 'londres': 'dest.london',
    // Spain
    'spain': 'dest.spain', 'españa': 'dest.spain', 'espanya': 'dest.spain',
    'madrid': 'dest.madrid',
    // France
    'france': 'dest.france', 'francia': 'dest.france', 'frança': 'dest.france',
    'marsella': 'dest.marsella', 'marseille': 'dest.marseille', // Need keys for these if they appear
    'toulouse': 'dest.toulouse',
    'tours': 'dest.tours'
  };

  ngOnInit() {
    this.apiService.getDestinations().subscribe(data => {
      this.destinations = data.map((d: any) => ({
        country: d.name,
        flagImg: d.flag_img,
        bgImage: d.cover_image,
        items: d.items.map((i: any) => ({ name: i.name, img: i.image }))
      }));
    });
  }

  getDisplayName(rawName: string): string {
    const key = this.nameMap[rawName.toLowerCase()];
    return key ? this.langService.t(key) : rawName;
  }

  updateSuggestions() {
    if (!this.searchTerm.trim() || this.searchTerm.length < 1) {
      this.suggestions = [];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    const allMatches: Suggestion[] = [];

    this.destinations.forEach(d => {
      // Check original and translated
      const countryKey = this.nameMap[d.country.toLowerCase()];
      const translatedCountry = countryKey ? this.langService.t(countryKey).toLowerCase() : d.country.toLowerCase();
      
      if (d.country.toLowerCase().includes(term) || translatedCountry.includes(term)) {
        allMatches.push({ name: countryKey ? this.langService.t(countryKey) : d.country, type: 'country' });
      }

      d.items.forEach((i: any) => {
        const cityKey = this.nameMap[i.name.toLowerCase()];
        const translatedCity = cityKey ? this.langService.t(cityKey).toLowerCase() : i.name.toLowerCase();
        
        if (i.name.toLowerCase().includes(term) || translatedCity.includes(term)) {
          allMatches.push({ name: cityKey ? this.langService.t(cityKey) : i.name, type: 'city' });
        }
      });
    });

    const uniqueMatchesMap = new Map();
    allMatches.forEach(m => {
      if (!uniqueMatchesMap.has(m.name.toLowerCase())) {
        uniqueMatchesMap.set(m.name.toLowerCase(), m);
      }
    });
    const uniqueMatches = Array.from(uniqueMatchesMap.values());

    const startsWithTerm = uniqueMatches.filter(val => val.name.toLowerCase().startsWith(term));
    const containsTerm = uniqueMatches.filter(val => !val.name.toLowerCase().startsWith(term));

    this.suggestions = [...startsWithTerm, ...containsTerm].slice(0, 5);
  }

  selectSuggestion(s: Suggestion) {
    this.searchTerm = s.name;
    this.onSearch();
    this.suggestions = [];
  }

  onSearch() {
    this.suggestions = [];
    if (!this.searchTerm.trim()) return;

    const term = this.searchTerm.toLowerCase().trim();
    
    // Check countries
    const countryIndex = this.destinations.findIndex(d => {
      const apiName = d.country.toLowerCase();
      const countryKey = this.nameMap[apiName];
      const translatedName = countryKey ? this.langService.t(countryKey).toLowerCase() : '';
      return apiName === term || translatedName === term;
    });

    if (countryIndex !== -1) {
      this.selectCountry(countryIndex);
      this.searchTerm = '';
      return;
    }

    // Check cities
    for (const country of this.destinations) {
      const city = country.items.find((i: any) => {
        const apiName = i.name.toLowerCase();
        const cityKey = this.nameMap[apiName];
        const translatedName = cityKey ? this.langService.t(cityKey).toLowerCase() : '';
        return apiName === term || translatedName === term;
      });

      if (city) {
        this.closeAll();
        this.router.navigate(['/packs', city.name]);
        this.searchTerm = '';
        return;
      }
    }
  }

  onArrowClick() {
    this.showCountrySelection = true;
  }

  selectCountry(index: number) {
    this.currentDestIndex = index;
    this.showCountrySelection = false;
    this.showDestinations = true;
  }

  nextDest() {
    this.currentDestIndex = (this.currentDestIndex + 1) % this.destinations.length;
  }

  prevDest() {
    this.currentDestIndex = (this.currentDestIndex - 1 + this.destinations.length) % this.destinations.length;
  }

  closeAll() {
    this.showCountrySelection = false;
    this.showDestinations = false;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
