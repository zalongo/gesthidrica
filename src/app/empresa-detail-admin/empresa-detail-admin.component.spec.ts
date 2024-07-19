import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaDetailAdminComponent } from './empresa-detail-admin.component';

describe('EmpresaDetailAdminComponent', () => {
  let component: EmpresaDetailAdminComponent;
  let fixture: ComponentFixture<EmpresaDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaDetailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpresaDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
