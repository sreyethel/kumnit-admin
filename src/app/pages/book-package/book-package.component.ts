import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Product } from 'src/app/stores/product.store';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { AddCoverProductComponent } from '../product/add-cover-product/add-cover-product.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { EditBookPackageComponent } from './edit-book-package/edit-book-package.component';
import { AddBookPackageComponent } from './add-book-package/add-book-package.component';

@Component({
  selector: 'app-book-package',
  templateUrl: './book-package.component.html',
  styleUrls: ['./book-package.component.scss']
})
export class BookPackageComponent implements OnInit {

  tabs = tabs.product;

  constructor(
    public store: Product,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData();
  }

  create() {
    let dialogRef = this.dialog.open(AddBookPackageComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddCoverProductComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: any) {
    let dialogRef = this.dialog.open(EditBookPackageComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Package', memo: 'If package is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(item, (success, error) => {
          if (success) {
            this.snackBar.open('Genre has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
