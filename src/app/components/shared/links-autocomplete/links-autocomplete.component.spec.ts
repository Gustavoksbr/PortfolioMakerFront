import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksAutocompleteComponent } from './links-autocomplete.component';

describe('LinksAutocompleteComponent', () => {
  let component: LinksAutocompleteComponent;
  let fixture: ComponentFixture<LinksAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
