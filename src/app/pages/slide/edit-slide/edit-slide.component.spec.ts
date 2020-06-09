import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlideComponent } from './edit-slide.component';

describe('EditSlideComponent', () => {
  let component: EditSlideComponent;
  let fixture: ComponentFixture<EditSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
