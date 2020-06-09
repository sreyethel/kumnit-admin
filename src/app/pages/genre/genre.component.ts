import { AddNewGenreComponent } from './add-new-genre/add-new-genre.component';
import { DeleteComponent } from './../../components/delete/delete.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { IGenre } from 'src/app/interfaces/bookstore';
import { EditGenreComponent } from './edit-genre/edit-genre.component';
import { AddGenreImageComponent } from './add-genre-image/add-genre-image.component';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  tabs = tabs.genres;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.genreRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewGenreComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: IGenre) {
    let dialogRef = this.dialog.open(EditGenreComponent, {
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
        this.store.delete(this.ds.genreRef(), item, (success, error) => {
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

  cover_upload(item) {
    let dialogRef = this.dialog.open(AddGenreImageComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true,
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }
}
