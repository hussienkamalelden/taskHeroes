import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeroesTable } from '../../models/heroes-table';
import { HeroeService } from '../../services/heros/heros.service';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, TableModule, InputTextModule, FormsModule, RatingModule]
})
export class HomeComponent {

  heroes: HeroesTable[] = [];
  filteredHeroes: HeroesTable[] = [];
  searchTerm: string = '';

  constructor(private heroeService: HeroeService) { }

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
}