import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GezilenYerlerComponent } from './gezilen-yerler.component';

describe('GezilenYerlerComponent', () => {
  let component: GezilenYerlerComponent;
  let fixture: ComponentFixture<GezilenYerlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GezilenYerlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GezilenYerlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
