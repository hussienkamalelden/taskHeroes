import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Heros } from '../../services/heros/heros.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ButtonModule]
})

export class LoginComponent {

  users: any[] = [];

  constructor(private heroService: Heros) { }

  ngOnInit(): void {
    this.heroService.getHeros().subscribe(data => {
      this.users = data;
      console.log(this.users);

    });
  }
}
