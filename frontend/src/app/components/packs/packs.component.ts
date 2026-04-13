import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-packs',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, NavbarComponent],
  templateUrl: './packs.html',
  styleUrl: './packs.css'
})
export class PacksComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  destination: string = '';

  ngOnInit() {
    this.route.params.subscribe(params => {
      const raw = params['destination'] || '';
      // Clean up "VIAJE Nº X (CITY)" -> "CITY"
      this.destination = this.cleanDestination(raw).toUpperCase();
    });
  }

  private cleanDestination(name: string): string {
    // Remove "VIAJE Nº X" or similar prefixes
    let cleaned = name.replace(/VIAJE\s*Nº\s*\d+/gi, '').trim();
    // Remove parentheses if any: "(Oslo)" -> "Oslo"
    cleaned = cleaned.replace(/^\(|\)$/g, '').trim();
    return cleaned;
  }

  packs = [
    {
      id: 'accommodation',
      key: 'packs.accommodation',
      iconClass: 'icon-home',
      img: '/house_icon.png',
      items: ['packs.feat.apt', 'packs.feat.coliving', 'packs.feat.location']
    },
    {
      id: 'activities',
      key: 'packs.activities',
      iconClass: 'icon-map',
      img: '/map_icon.png',
      items: ['packs.feat.tours', 'packs.feat.guides', 'packs.feat.culture']
    },
    {
      id: 'medical',
      key: 'packs.medical',
      iconClass: 'icon-shield',
      img: '/shield_icon.png',
      items: ['packs.feat.support', 'packs.feat.global', 'packs.feat.clinics']
    },
    {
      id: 'joint',
      key: 'packs.joint',
      iconClass: 'icon-award',
      img: '/diamond_icon.png',
      isPopular: true,
      items: ['packs.feat.reloc', 'packs.feat.all', 'packs.feat.value']
    }
  ];

  getCityDecoration() {
    const city = this.destination.toLowerCase();
    const decorations: any = {
      'oslo': { color: '#4a6fa5', textKey: 'packs.decor.oslo' },
      'munich': { color: '#ff7f50', textKey: 'packs.decor.munich' },
      'london': { color: '#e74c3c', textKey: 'packs.decor.london' },
      'madrid': { color: '#f1c40f', textKey: 'packs.decor.madrid' }
    };
    return decorations[city] || { color: '#4a6fa5', textKey: 'packs.decor.default' };
  }
}
