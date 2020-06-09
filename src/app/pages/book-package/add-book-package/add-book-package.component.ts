import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { AddProductComponent } from '../../product/add-product/add-product.component';
import { Environment } from 'src/app/stores/environment.store';
import { Product } from 'src/app/stores/product.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from 'src/app/services/data.service';
import { checkExistDoc } from 'src/app/services/fire-validators.service';
import { IProduct } from 'src/app/interfaces/subscriber';
import { StatusObj } from 'src/app/dummy/status';
import { ConvertService } from 'src/app/services/convert.service';
import { IProductByBook } from '../../../interfaces/subscriber';
import { ProductType } from '../../../dummy/productType';
import { SelectBooksComponent } from '../select-books/select-books.component';

@Component({
  selector: 'app-add-book-package',
  templateUrl: './add-book-package.component.html',
  styleUrls: ['./add-book-package.component.scss']
})
export class AddBookPackageComponent implements OnInit {

  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  price: AbstractControl;
  period: AbstractControl;
  discount: AbstractControl;
  note: AbstractControl;
  options: any = { key: 0, name: '' };
  ProductType = ProductType;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Product,
    private afs: AngularFirestore,
    private ds: DataService,
    public dialog: MatDialog
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required]), checkExistDoc(this.afs, "products", "name")],
      price: [null, Validators.required],
      period: [null, Validators.required],
      discount: [null],
      note: [null],
      productType: [null, Validators.required]
    })
    this.name = this.form.controls['name'];
    this.period = this.form.controls["period"];
    this.discount = this.form.controls["discount"];
    this.note = this.form.controls["note"];
    this.price = this.form.controls["price"];
  }


  radioChange() {
    console.log('this.options', this.options)
    if (this.options.key == 1) {
      this.store.selectedBooks = [];
    }
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.store.selectedBooks = []
  }

  _onClose() {
    this.store.selectedBooks = [];
    this.dialogRef.close('no')
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

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { name, price, period, discount, note, productType } = f;
      const item: IProduct = {
        key: this.ds.createId(),
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
        productType: productType,
        book: this.store.selectedBooks
      }
      this.store.addNew(item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Package has been created.', 'done', { duration: 2500 });
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
