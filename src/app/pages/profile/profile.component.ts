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
  heroProfileData: Hero | null = null;
  preventRating: boolean = false;
  ratedBefore: boolean = false;


  constructor(private route: ActivatedRoute, private heroeService: HeroeService) {
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.getLoggedHero();
    this.getHeroProfile();
    this.checkIfRatedBefore();
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
        this.heroProfileData = hero;
        this.username = hero?.username;
        this.email = hero?.email;
        this.power = hero?.power;
        this.totalRates = hero?.myRates?.length;
        this.role = hero?.role;
        if (hero?.myRates?.length) {
          let sum = hero?.myRates.reduce((acc: number, curr: number) => acc + curr, 0);
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

  checkIfRatedBefore() {
    this.ratedBefore = !!this.loggedHero?.heroesIRated.includes(this.id);
  }

  rateHero() {
    this.loggedHero?.heroesIRated.push(this.id);
    this.heroeService.updateHero(this.loggedHero?.id, this.loggedHero).subscribe(
      (res) => {
        this.heroProfileData?.myRates.push(this.rate);
        this.heroeService.updateHero(this.id, this.heroProfileData).subscribe(
          (updatedHero) => {
            this.ratedBefore = true;
            localStorage.setItem('heroData', JSON.stringify(this.loggedHero));
          }
        );
      }
    );
  }
}
