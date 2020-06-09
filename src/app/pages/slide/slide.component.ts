import { AddCoverSlideComponent } from './add-cover-slide/add-cover-slide.component';
import { AddNewSlideComponent } from './add-new-slide/add-new-slide.component';
import { DeleteComponent } from './../../components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { IGenre } from 'src/app/interfaces/bookstore';
import { EditSlideComponent } from './edit-slide/edit-slide.component';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent implements OnInit {
  tabs = tabs.slides;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.slideRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewSlideComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  cover(item) {
    let dialogRef = this.dialog.open(AddCoverSlideComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IGenre) {
    let dialogRef = this.dialog.open(EditSlideComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: IGenre) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Genre', memo: 'If genre is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.slideRef(), item, (success, error) => {
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
