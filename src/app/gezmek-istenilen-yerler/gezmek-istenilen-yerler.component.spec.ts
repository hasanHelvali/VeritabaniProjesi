import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GezmekIstenilenYerlerComponent } from './gezmek-istenilen-yerler.component';

describe('GezmekIstenilenYerlerComponent', () => {
  let component: GezmekIstenilenYerlerComponent;
  let fixture: ComponentFixture<GezmekIstenilenYerlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GezmekIstenilenYerlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GezmekIstenilenYerlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
