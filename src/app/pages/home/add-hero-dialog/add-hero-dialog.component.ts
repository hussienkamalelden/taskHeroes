import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RegisterFormComponent } from '../../../shared/components/register-form/register-form.component';

@Component({
  selector: 'app-add-hero-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule, RegisterFormComponent],
  templateUrl: './add-hero-dialog.component.html',
  styleUrl: './add-hero-dialog.component.scss'
})
export class AddHeroDialogComponent {

  @Input() visible: boolean = false;
  @Output() dataEmitter: EventEmitter<string> = new EventEmitter<string>();

  handleDialog() {
    // const data = 'Hello from child';
    this.dataEmitter.emit();
  }
}
