import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdenaveisComponent } from './listar-ordenaveis.component';

describe('ListarOrdenaveisComponent', () => {
  let component: ListarOrdenaveisComponent;
  let fixture: ComponentFixture<ListarOrdenaveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarOrdenaveisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarOrdenaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
