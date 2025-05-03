import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarImagemComponent } from './selecionar-imagem.component';

describe('SelecionarImagemComponent', () => {
  let component: SelecionarImagemComponent;
  let fixture: ComponentFixture<SelecionarImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarImagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelecionarImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
