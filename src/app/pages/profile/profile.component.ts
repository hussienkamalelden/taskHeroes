import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroeService } from '../../shared/services/heros/heroes.service';
import { Hero } from '../../shared/models/hero';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, RatingModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  id: string;
  username: string = "";
  email: string = "";
  power: string = "";
  role: string = "";
  rate: number = 0;
  totalRates: number = 0;
  loggedHero: Hero | null = null;
  preventRating: boolean = false;

  constructor(private route: ActivatedRoute, private heroeService: HeroeService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.getLoggedHero();
    this.getHeroProfile();
  }

  getLoggedHero() {
    const heroData = localStorage.getItem("heroData");
    if (heroData) {
      this.loggedHero = JSON.parse(heroData);
      this.preventRating = this.loggedHero?.id == this.id ? true : false;
    }
  }

  getHeroProfile() {
    this.heroeService.getHeroProfile(this.id).subscribe(
      (hero) => {
        this.username = hero?.username;
        this.email = hero?.email;
        this.power = hero?.power;
        this.totalRates = hero?.myRates?.length;
        this.role = hero?.role;
        if (hero?.myRates?.length) {
          let sum = hero?.myRates.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
          this.rate = sum / hero?.myRates?.length;
        } else {
          this.rate = hero?.myRates?.length;
        }
      },
      (error) => {
        console.error('Error fetching user', error);
      }
    );
  }
}
