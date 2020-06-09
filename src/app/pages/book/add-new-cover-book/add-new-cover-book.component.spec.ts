import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCoverBookComponent } from './add-new-cover-book.component';

describe('AddNewCoverBookComponent', () => {
  let component: AddNewCoverBookComponent;
  let fixture: ComponentFixture<AddNewCoverBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCoverBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCoverBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
