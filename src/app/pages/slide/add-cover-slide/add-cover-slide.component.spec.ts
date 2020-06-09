import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoverSlideComponent } from './add-cover-slide.component';

describe('AddCoverSlideComponent', () => {
  let component: AddCoverSlideComponent;
  let fixture: ComponentFixture<AddCoverSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoverSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoverSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
