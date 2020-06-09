import { Component, OnInit } from '@angular/core';
import { Bookstore } from '../../stores/bookstore';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PhoneNumber } from '../../services/phoneNumber.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  phoneNumber: AbstractControl
  form: FormGroup
  email: AbstractControl
  about: AbstractControl

  constructor(
    public store: Bookstore,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {



    await this.store.fetchAbout((res) => {
      this.form = this.fb.group({
        phone: [null, Validators.required],
        email: [null, Validators.required],
        about: [res.about, Validators.required]
      })
      this.phoneNumber = this.form.controls['phone']
      this.email = this.form.controls['email']
      this.about = this.form.controls['about']
    })





  }

  _onAddPhoneNumber() {
    console.log('this.phoneNumber', this.phoneNumber.value)
    this.store.addPhoneNumber(this.phoneNumber.value)
  }

  _onDeleteNumber(item) {
    this.store.deletePhoneNumber(item)
  }

  _onAddEmail() {
    console.log('this.phoneNumber', this.email.value)
    this.store.addEmail(this.email.value)
  }

  _onDeleteEmail(item) {
    this.store.deleteEmail(item)
  }

  _onUpdateAbout() {
    console.log('this.about', this.about.value)
    this.store.updateAbout(this.store.dataAbout, this.about.value)
  }

}
