import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyProfileComponent } from './myprofile.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('MyProfileComponent', () => {
  let component: MyProfileComponent;
  let fixture: ComponentFixture<MyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule],
      declarations: [],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties with data from local storage', () => {
    const testData = {
      username: 'testUser',
      email: 'test@example.com',
      power: 'testPower',
      role: 'testRole',
      myRates: [4, 5, 3]
    };
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(testData));
    component.ngOnInit();
    expect(component.username).toEqual(testData.username);
    expect(component.email).toEqual(testData.email);
    expect(component.power).toEqual(testData.power);
    expect(component.role).toEqual(testData.role);
    expect(component.totalRates).toEqual(testData.myRates.length);
    expect(component.rate).toEqual(4); // Assuming the average rating calculation is correct
  });

  it('should initialize component properties with default values if no data found in local storage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.ngOnInit();
    expect(component.username).toEqual('');
    expect(component.email).toEqual('');
    expect(component.power).toEqual('');
    expect(component.role).toEqual('');
    expect(component.totalRates).toEqual(0);
    expect(component.rate).toEqual(0);
  });
});
