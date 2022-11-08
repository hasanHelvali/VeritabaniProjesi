import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HakkimizdaComponent } from './hakkimizda.component';

describe('HakkimizdaComponent', () => {
  let component: HakkimizdaComponent;
  let fixture: ComponentFixture<HakkimizdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HakkimizdaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HakkimizdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
