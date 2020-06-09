import { AddUserComponent } from './../../dialog/add-user/add-user.component';
import { DeleteComponent } from './../../components/delete/delete.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Environment } from 'src/app/stores/environment.store';
import { Component, OnInit } from '@angular/core';
import { tabs } from 'src/app/dummy/tabs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(
    public router: Router,
    public store: Environment,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.store.fetchData();
  }

  create() {
    let dialogRef = this.dialog.open(AddUserComponent, {
      data: null,
      width: '35vw',
      height: '100vh',
      role: 'dialog',
      disableClose: true
    });
    dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  update(item) {
    // let dialogRef = this.dialog.open(EditUserComponent, {
    //   data: item,
    //   width: '35vw',
    //   height: '100vh',
    //   role: 'dialog',
    // });
    // dialogRef.updatePosition({ top: '0', right: '0', bottom: '0' });
  }

  delete(item) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      data: { title: 'Delete User', memo: 'If this district is using in other list you cannot delete district.', name: item.name },
      width: '35vw',
      disableClose: true,
      role: 'dialog',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') {
        // this.geo.deleteProvince(item.key,(success,error)=>{
        //   if (success) {
        //     this.snackBar.open('Province has been deleted.', 'done', { duration: 2000 });
        //   }
        //   else {
        //     this.snackBar.open(error, 'Error')
        //   }
        // })
      }
    });
  }
}
