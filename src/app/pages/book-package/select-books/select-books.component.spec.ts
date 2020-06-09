import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBooksComponent } from './select-books.component';

describe('SelectBooksComponent', () => {
  let component: SelectBooksComponent;
  let fixture: ComponentFixture<SelectBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
