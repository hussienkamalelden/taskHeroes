import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DefaultLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'heroes';
}
