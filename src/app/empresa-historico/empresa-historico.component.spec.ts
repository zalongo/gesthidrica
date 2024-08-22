import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaHistoricoComponent } from './empresa-historico.component';

describe('EmpresaHistoricoComponent', () => {
  let component: EmpresaHistoricoComponent;
  let fixture: ComponentFixture<EmpresaHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaHistoricoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
