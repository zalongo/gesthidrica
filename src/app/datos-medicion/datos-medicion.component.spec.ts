import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosMedicionComponent } from './datos-medicion.component';

describe('DatosMedicionComponent', () => {
  let component: DatosMedicionComponent;
  let fixture: ComponentFixture<DatosMedicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosMedicionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosMedicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
