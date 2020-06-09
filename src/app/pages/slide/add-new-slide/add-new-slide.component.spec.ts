import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSlideComponent } from './add-new-slide.component';

describe('AddNewSlideComponent', () => {
  let component: AddNewSlideComponent;
  let fixture: ComponentFixture<AddNewSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
