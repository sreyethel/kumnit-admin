import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPdfBookComponent } from './add-new-pdf-book.component';

describe('AddNewPdfBookComponent', () => {
  let component: AddNewPdfBookComponent;
  let fixture: ComponentFixture<AddNewPdfBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPdfBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPdfBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
