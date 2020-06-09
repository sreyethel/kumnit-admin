import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGenreImageComponent } from './add-genre-image.component';

describe('AddGenreImageComponent', () => {
  let component: AddGenreImageComponent;
  let fixture: ComponentFixture<AddGenreImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGenreImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGenreImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
