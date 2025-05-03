import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenavelComponent } from './ordenavel.component';

describe('OrdenavelComponent', () => {
  let component: OrdenavelComponent;
  let fixture: ComponentFixture<OrdenavelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenavelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenavelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
