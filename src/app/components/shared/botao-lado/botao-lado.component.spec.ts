import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoLadoComponent } from './botao-lado.component';

describe('BotaoLadoComponent', () => {
  let component: BotaoLadoComponent;
  let fixture: ComponentFixture<BotaoLadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoLadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotaoLadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
