import { IBook } from './../../../interfaces/bookstore';
import { BOOK_OPTIONS, BOOK_STATUS, PAYMENT_TYPES } from './../../../dummy/status';
import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { StatusObj } from 'src/app/dummy/status';
import { BOOK_TYPES } from '../../../dummy/status';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  status: AbstractControl;
  date: AbstractControl;
  description: AbstractControl;
  genre: AbstractControl;
  tag: AbstractControl;
  trending: AbstractControl;
  paymentType: AbstractControl;
  price: AbstractControl;
  selected: any;

  genreData: any;
  tagData: any;
  tradingData = BOOK_OPTIONS;
  bookStatus = BOOK_STATUS;
  paymentData = PAYMENT_TYPES;
  bookType = BOOK_TYPES;
  constructor(
    public dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService

  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      status: [null, Validators.required],
      description: [null, Validators.required],
      genre: [null, Validators.required],
      trending: [null, Validators.required],
      tag: [null],
      date: [null, Validators.required],
      bookType: [null],
      paymentType: [null],
      // price: [null, Validators.required],
    })

    this.name = this.form.controls['name'];
    this.status = this.form.controls["status"];
    this.description = this.form.controls["description"];
    this.trending = this.form.controls["trending"];
    this.genre = this.form.controls["genre"];
    this.tag = this.form.controls["tag"];
    this.date = this.form.controls["date"];
    this.paymentType = this.form.controls["paymentType"];
    this.price = this.form.controls["price"];
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  async ngOnInit() {
    this.buildForm();
    this.genreData = await this.store.fetchGenre();
    this.tagData = await this.store.fetchTag();
    const { title, bookStatus, description, trending, genre, tag, publicDate, paymentType, price, bookType } = this.data;
    this.form.patchValue({
      name: title,
      status: bookStatus,
      description: description,
      trending: trending,
      genre: genre,
      date: publicDate.toDate(),
      // paymentType: paymentType,
      // bookType: bookType,
      // tag: tag,
      price: price,
    })
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name, genre, trending, tag, date, description, status, paymentType, price, bookType } = f;
      let tagKey = [];
      let paymentTypeKey = [];
      // if (tag) tagKey = tag.map(m => (m.key))
      // if (paymentType) paymentTypeKey = paymentType.key;
      const item: IBook = {
        key: this.data.key,
        title: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
        description: description,
        genre: genre,
        trending: trending,
        tag: null,
        publicDate: date,
        bookStatus: status,
        tagKey: null,
        paymentType: paymentType ? paymentType : this.data.paymentType,
        paymentTypeKey: paymentType ? paymentType.key : this.data.paymentTypeKey,
        bookType: bookType ? bookType : this.data.bookType,
        bookTypeKey: bookType ? bookType.key : this.data.bookType.key,
        ratingScale: 5,
        price: 0
      }

      this.store.update(this.ds.bookRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Book has been updated.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
