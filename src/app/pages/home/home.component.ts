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

  constructor(private heroeService: HeroeService,
    private router: Router) { }

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe(data => {
      this.heroes = data.filter(hero => hero.role !== "admin");
      this.filteredHeroes = this.heroes;
    });
  }

  onSearch(): void {
    if (this.searchTerm) {
      this.filteredHeroes = this.heroes.filter(hero =>
        hero.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        hero.power.toString().includes(this.searchTerm) ||
        hero.myRate.toString().includes(this.searchTerm)
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
  }
}