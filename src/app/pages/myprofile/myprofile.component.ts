import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-myprofile',
  standalone: true,
  imports: [NavbarComponent, RatingModule, ButtonModule, CommonModule, FormsModule],
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.scss'
})
export class MyProfileComponent {

  username: string = "";
  email: string = "";
  power: string = "";
  role: string = "";
  rate: number = 0;
  totalRates: number = 0;

  ngOnInit() {
    const heroData = localStorage.getItem("heroData");
    if (heroData) {
      const parsedData = JSON.parse(heroData);
      this.username = parsedData?.username;
      this.email = parsedData?.email;
      this.power = parsedData?.power;
      this.totalRates = parsedData?.myRates?.length;
      this.role = parsedData?.role;
      if (parsedData?.myRates?.length) {
        let sum = parsedData?.myRates.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
        this.rate = sum / parsedData?.myRates?.length;
      } else {
        this.rate = parsedData?.myRates?.length;
      }
    }
  }

}
