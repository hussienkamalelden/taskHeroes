import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroesTable } from '../../shared/models/heroes-table';
import { HeroeService } from '../../shared/services/heros/heroes.service';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { AddHeroDialogComponent } from './add-hero-dialog/add-hero-dialog.component';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, TableModule, InputTextModule, FormsModule, RatingModule, ButtonModule, AddHeroDialogComponent, RouterModule, NavbarComponent]
})
export class HomeComponent {
  visible: boolean = false;
  heroes: HeroesTable[] = [];
  filteredHeroes: HeroesTable[] = [];
  searchTerm: string = '';
  userRole: string = 'hero';

  constructor(private heroeService: HeroeService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllHeroes();
    const heroData = localStorage.getItem("heroData");
    if (heroData) {
      const parsedData = JSON.parse(heroData);
      this.userRole = parsedData?.role;
    }
  }

  getAllHeroes() {
    this.heroeService.getHeroes().subscribe(data => {
      this.heroes = data.map(hero => {
        if (hero.role !== "admin") {
          return { ...hero, myRates: this.calcRates(hero.myRates) }
        }
      }
      );
      this.filteredHeroes = this.heroes;
    });
  }

  calcRates(myRates: number[]) {
    if (myRates?.length) {
      let sum = myRates.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
      return sum / myRates?.length;
    } else {
      return myRates?.length;
    }
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredHeroes = this.heroes.filter(hero =>
      (console.log(hero),

        hero?.username?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hero?.power?.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredHeroes = this.heroes;
    }
  }

  showDialog() {
    this.visible = true;
  }

  receiveDialogData(event: String) {
    this.visible = false;
    this.getAllHeroes();
  }
}