import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

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
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Submit form and show validation errors
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password!' });
    // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfully!' });
    // this.router.navigate(['/home']);
  }

  // Helper method to access form controls
  get f() {
    return this.loginForm.controls;
  }
}