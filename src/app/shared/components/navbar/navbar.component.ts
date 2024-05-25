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
  userName: String = "username"

  constructor(private router: Router) { }

  logout(): void {
    localStorage.removeItem("heroData");
    this.router.navigate(['/login']);
  }
}