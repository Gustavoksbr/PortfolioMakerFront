import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioLinkedinComponent } from './portfolio-linkedin.component';

describe('PortfolioLinkedinComponent', () => {
  let component: PortfolioLinkedinComponent;
  let fixture: ComponentFixture<PortfolioLinkedinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioLinkedinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioLinkedinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
