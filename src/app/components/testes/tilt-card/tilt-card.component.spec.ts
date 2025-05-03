import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiltCardComponent } from './tilt-card.component';

describe('TiltCardComponent', () => {
  let component: TiltCardComponent;
  let fixture: ComponentFixture<TiltCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TiltCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiltCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
