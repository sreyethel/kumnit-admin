import { DeleteComponent } from './../../components/delete/delete.component';
import { AddNewTagComponent } from './add-new-tag/add-new-tag.component';
import { DataService } from 'src/app/services/data.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Bookstore } from './../../stores/bookstore';
import { tabs } from './../../dummy/tabs';
import { Component, OnInit } from '@angular/core';
import { ITag } from 'src/app/interfaces/bookstore';
import { EditTagsComponent } from './edit-tags/edit-tags.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tabs = tabs.tags;
  constructor(
    public store: Bookstore,
    private snackBar: MatSnackBar,
    private ds: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData(this.ds.tagRef());
  }

  create() {
    let dialogRef = this.dialog.open(AddNewTagComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  edit(item: ITag) {
    let dialogRef = this.dialog.open(EditTagsComponent, {
      data: item,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item: ITag) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete Tag', memo: 'If tag is using by other function in system you cannot delete it.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.store.delete(this.ds.tagRef(), item, (success, error) => {
          if (success) {
            this.snackBar.open('Tag has been deleted.', 'done', { duration: 2000 });
          }
          else {
            this.snackBar.open(error, 'Error')
          }
        })
      }
    });
  }
}
