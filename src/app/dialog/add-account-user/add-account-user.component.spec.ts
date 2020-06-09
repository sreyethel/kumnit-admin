import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccountUserComponent } from './add-account-user.component';

describe('AddAccountUserComponent', () => {
  let component: AddAccountUserComponent;
  let fixture: ComponentFixture<AddAccountUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccountUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
