import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookPackageComponent } from './add-book-package.component';

describe('AddBookPackageComponent', () => {
  let component: AddBookPackageComponent;
  let fixture: ComponentFixture<AddBookPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBookPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
