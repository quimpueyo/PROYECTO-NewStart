import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  showDestinations = false;
  showCountrySelection = false;
  currentDestIndex = 0;

  destinations = [
    {
      country: 'NORUEGA',
      flagImg: '/assets/img/flags/norway.png',
      bgImage: '/assets/img/destinations/norway-fjord.jpg',
      items: [
        { name: 'VIAJE Nº 1 (Oslo)', img: '/assets/img/destinations/oslo.jpg' },
        { name: 'VIAJE Nº 2 (Bergen)', img: '/assets/img/destinations/bergen.jpg' },
        { name: 'VIAJE Nº 3 (Stavanger)', img: '/assets/img/destinations/stavanger.jpg' }
      ]
    },
    {
      country: 'ALEMANIA',
      flagImg: '/assets/img/flags/germany.png',
      bgImage: '/assets/img/destinations/germany-flag.jpg',
      items: [
        { name: 'Berlin', img: '/assets/img/destinations/berlin.jpg' },
        { name: 'Bremen', img: '/assets/img/destinations/bremen.jpg' },
        { name: 'Lübeck', img: '/assets/img/destinations/lubeck.jpg' }
      ]
    },
    {
      country: 'FRANCIA',
      flagImg: '/assets/img/flags/france.png',
      bgImage: '/assets/img/destinations/france-flag.jpg',
      items: [
        { name: 'Marsella', img: '/assets/img/destinations/marseille.jpg' },
        { name: 'Toulouse', img: '/assets/img/destinations/toulouse.jpg' },
        { name: 'Tours', img: '/assets/img/destinations/tours.jpg' }
      ]
    }
  ];

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
}
