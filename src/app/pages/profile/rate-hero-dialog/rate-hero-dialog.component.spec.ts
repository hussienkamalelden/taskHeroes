import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateHeroDialogComponent } from './rate-hero-dialog.component';

describe('RateHeroDialogComponent', () => {
  let component: RateHeroDialogComponent;
  let fixture: ComponentFixture<RateHeroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateHeroDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateHeroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
