import { Component } from '@angular/core';
import { RegisterFormComponent } from '../../shared/components/register-form/register-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [RegisterFormComponent],
})

export class RegisterComponent {
}