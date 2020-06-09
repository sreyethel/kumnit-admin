import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewGenreComponent } from './add-new-genre.component';

describe('AddNewGenreComponent', () => {
  let component: AddNewGenreComponent;
  let fixture: ComponentFixture<AddNewGenreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewGenreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewGenreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
