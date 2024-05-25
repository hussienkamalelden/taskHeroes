import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { HeroeService } from '../../shared/services/heros/heroes.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ReactiveFormsModule, CommonModule, RouterModule, ToastModule],
  providers: [MessageService]
})

export class RegisterComponent {
  registrationForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private heroeService: HeroeService,
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      power: ['', Validators.required]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  // Custom validator to check if passwords match
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];
      if (confirmPassControl.errors && !confirmPassControl.errors?.['mustMatch']) {
        return;
      }
      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  async onSubmit() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }

    this.checkHeroExists(this.registrationForm.value.email).subscribe(exists => {
      if (!exists) {
        this.addNewHero();
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'This email already exists. Please try to log in instead!' });
      }
    });
  }

  addNewHero(): void {
    const heroData = {
      ...this.registrationForm.value,
      token: true,
      myRate: 0,
      totalRates: 0,
      heroesIRated: [],
      role: "hero"
    }
    delete heroData.confirmPassword;

    this.heroeService.addNewHero(heroData).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully!' });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Account creation failed!' });
      }
    );
  }

  checkHeroExists(email: string): Observable<boolean> {
    return this.heroeService.getHeroes().pipe(
      map(data => !!data.find(hero => hero.email === email))
    );
  }

  get f() {
    return this.registrationForm.controls;
  }
}