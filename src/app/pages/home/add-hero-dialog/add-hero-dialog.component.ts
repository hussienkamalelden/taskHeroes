import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-hero-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
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
