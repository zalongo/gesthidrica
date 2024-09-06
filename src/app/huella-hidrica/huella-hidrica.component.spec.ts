import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuellaHidricaComponent } from './huella-hidrica.component';

describe('HuellaHidricaComponent', () => {
  let component: HuellaHidricaComponent;
  let fixture: ComponentFixture<HuellaHidricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HuellaHidricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HuellaHidricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
