import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularHuellaComponent } from './calcular-huella.component';

describe('CalcularHuellaComponent', () => {
  let component: CalcularHuellaComponent;
  let fixture: ComponentFixture<CalcularHuellaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcularHuellaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcularHuellaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });   
  
  
});
