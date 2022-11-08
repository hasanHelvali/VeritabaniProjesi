import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaritaHareketleriComponent } from './harita-hareketleri.component';

describe('HaritaHareketleriComponent', () => {
  let component: HaritaHareketleriComponent;
  let fixture: ComponentFixture<HaritaHareketleriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaritaHareketleriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaritaHareketleriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
