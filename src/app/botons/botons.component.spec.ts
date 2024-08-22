import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonsComponent } from './botons.component';

describe('BotonsComponent', () => {
  let component: BotonsComponent;
  let fixture: ComponentFixture<BotonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
