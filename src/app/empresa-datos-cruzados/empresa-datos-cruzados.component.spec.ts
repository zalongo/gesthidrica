import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDatosCruzadosComponent } from './empresa-datos-cruzados.component';

describe('EmpresaDatosCruzadosComponent', () => {
  let component: EmpresaDatosCruzadosComponent;
  let fixture: ComponentFixture<EmpresaDatosCruzadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaDatosCruzadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaDatosCruzadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
