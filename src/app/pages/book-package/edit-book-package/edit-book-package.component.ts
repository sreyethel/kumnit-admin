import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { EditProductComponent } from '../../product/edit-product/edit-product.component';
import { Environment } from 'src/app/stores/environment.store';
import { Product } from 'src/app/stores/product.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistOnEdit } from 'src/app/services/fire-validators.service';
import { IProduct } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { ProductType } from '../../../dummy/productType';
import { SelectBooksComponent } from '../select-books/select-books.component';

@Component({
  selector: 'app-edit-book-package',
  templateUrl: './edit-book-package.component.html',
  styleUrls: ['./edit-book-package.component.scss']
})
export class EditBookPackageComponent implements OnInit {

  @ViewChild("focusInput") inputEl: ElementRef;

  form: FormGroup;
  name: AbstractControl;
  price: AbstractControl;
  period: AbstractControl;
  discount: AbstractControl;
  note: AbstractControl;

  ProductType = ProductType

  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Product,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required]), checkExistOnEdit(this.afs, "products", "name", this.data.name)],
      price: [this.data.price, Validators.required],
      period: [this.data.period, Validators.required],
      discount: [this.data.discount],
      note: [this.data.note],
      productType: [null]

    })
    this.name = this.form.controls['name'];
    this.period = this.form.controls["period"];
    this.discount = this.form.controls["discount"];
    this.note = this.form.controls["note"];
    this.price = this.form.controls["price"];
  }


  ngOnInit() {
    this.buildForm();
    this.store.selectedBooks = this.data.book
  }

  ngOnDestroy(): void {
    this.store.selectedBooks = []

  }

  _onAddBook() {
    let dialogRef = this.dialog.open(SelectBooksComponent, {
      data: null,
      width: '50vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '35vw', bottom: '0' });
  }

  _onRemoveSelected(i: number) {
    this.store.selectedBooks = this.store.selectedBooks.slice(0, i).concat(this.store.selectedBooks.slice(i + 1, this.store.selectedBooks.length))
    console.log('this.store.selectedBooks', this.store.selectedBooks)
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name, price, period, discount, note, productType } = f;
      const item: IProduct = {
        key: this.data.key,
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
        price: ConvertService.toNumber(price),
        period: ConvertService.toNumber(period),
        discount: ConvertService.toNumber(discount),
        note: note,
        productType: productType ? productType : this.data.productType,
        book: this.store.selectedBooks
      }
      this.store.update(this.ds.productRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Package has been updated.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
          this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
