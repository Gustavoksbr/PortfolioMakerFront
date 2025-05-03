import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPortfolioComponent } from './mostrar-portfolio.component';

describe('MostrarPortfolioComponent', () => {
  let component: MostrarPortfolioComponent;
  let fixture: ComponentFixture<MostrarPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
