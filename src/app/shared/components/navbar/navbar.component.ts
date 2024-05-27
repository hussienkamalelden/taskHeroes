import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  userName: string = "username";

  constructor(private router: Router) {
    const heroData = localStorage.getItem("heroData");
    if (heroData) {
      const parsedData = JSON.parse(heroData);
      this.userName = parsedData.username;
    }
  }

  logout(): void {
    localStorage.removeItem("heroData");
    this.router.navigate(['/login']);
  }
}