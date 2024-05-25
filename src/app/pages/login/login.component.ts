import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HeroeService } from '../../shared/services/heros/heroes.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule],
  providers: [MessageService]
})

export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private heroeService: HeroeService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Submit form and show validation errors
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.onLogin(this.loginForm.value.email, this.loginForm.value.password)
  }

  onLogin(email: string, password: string) {
    this.heroeService.login(email, password).subscribe(
      hero => {
        if (hero) {
          localStorage.setItem('heroData', JSON.stringify(hero));
          this.router.navigate(['/home']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password!' });
        }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again later.' });
      }
    );
  }

  // Helper method to access form controls
  get f() {
    return this.loginForm.controls;
  }
}