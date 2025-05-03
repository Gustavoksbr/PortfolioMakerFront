import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortolioComponent } from './portolio.component';

describe('PortolioComponent', () => {
  let component: PortolioComponent;
  let fixture: ComponentFixture<PortolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
