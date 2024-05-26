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

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, TableModule, InputTextModule, FormsModule, RatingModule, ButtonModule, AddHeroDialogComponent, RouterModule]
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
      this.heroes = data.filter(hero => hero.role !== "admin");
      this.filteredHeroes = this.heroes;
    });
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
    this.getAllHeroes();
  }

  receiveDialogData(event: String) {
    this.visible = false;
  }
}