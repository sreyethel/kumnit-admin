import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookPackageComponent } from './edit-book-package.component';

describe('EditBookPackageComponent', () => {
  let component: EditBookPackageComponent;
  let fixture: ComponentFixture<EditBookPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
