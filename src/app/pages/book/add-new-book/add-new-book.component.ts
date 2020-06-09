import { IBook } from './../../../interfaces/bookstore';
import { BOOK_OPTIONS, BOOK_STATUS, PAYMENT_TYPES } from './../../../dummy/status';
import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSelectionList } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject, Host } from '@angular/core';
import { StatusObj } from 'src/app/dummy/status';
import { BOOK_TYPES } from '../../../dummy/status';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.scss']
})

export class AddNewBookComponent implements OnInit {
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

  genreData: any;
  tagData: any;
  tradingData = BOOK_OPTIONS;
  bookStatus = BOOK_STATUS;
  paymentData = PAYMENT_TYPES;

  bookType = BOOK_TYPES

  constructor(

    public dialogRef: MatDialogRef<AddNewBookComponent>,
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
      status: [BOOK_STATUS[0]],
      description: [null, Validators.required],
      genre: [null, Validators.required],
      trending: [BOOK_OPTIONS[0], Validators.required],
      tag: [null],
      date: [new Date(), Validators.required],
      paymentType: [null, Validators.required],
      bookType: [null, Validators.required],
      price: [null],
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
    console.log('john')
    this.genreData = await this.store.fetchGenre();
    this.tagData = await this.store.fetchTag();
    this.form.patchValue({
      genre: this.genreData[0]
    })

  }

  handleSelection(event, item) {
    console.log('event', event)
    if (event.selected) {
      event.source.selectionList.options.toArray().forEach(element => {
        if (element.value.text != item.text) {
          element.selected = false;
        }
      });
    }
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { name, genre, trending, tag, date, description, status, paymentType, price, bookType } = f;
      // const tagKey = tag.map(m => (m.key));
      // const paymentTypeKey = paymentType.map(m => (m.key));
      const item: IBook = {
        key: this.ds.createId(),
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
        tag: tag,
        bookType: bookType,
        bookTypeKey: bookType.key,
        publicDate: date,
        bookStatus: status,
        docUrl: null,
        tagKey: null,
        paymentType: paymentType,
        paymentTypeKey: paymentType.key,
        ratingScale: 5,
        price: ConvertService.toNumber(price)
      }
      this.store.addNew(this.ds.bookRef(), item, (success, error) => {
        if (success) {
          if (!isNew) {
            this.dialogRef.close();
            this.snackBar.open('Book has been created.', 'done', { duration: 2500 });
            this.form.enable();
            this.form.reset();
            this.inputEl.nativeElement.focus();
          } else {
            this.form.reset();
            this.form.enable();
            this.buildForm();
          }

        }
        else {
          alert(error)
        }
      })
    }
  }

}
