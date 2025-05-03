import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPortfoliosComponent } from './listar-portfolios.component';

describe('ListarPortfoliosComponent', () => {
  let component: ListarPortfoliosComponent;
  let fixture: ComponentFixture<ListarPortfoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPortfoliosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarPortfoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
