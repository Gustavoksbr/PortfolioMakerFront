import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemComponent } from './imagem.component';

describe('ImagemComponent', () => {
  let component: ImagemComponent;
  let fixture: ComponentFixture<ImagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
