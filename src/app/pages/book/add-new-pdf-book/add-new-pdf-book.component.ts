import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs/Observable';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-new-pdf-book',
  templateUrl: './add-new-pdf-book.component.html',
  styleUrls: ['./add-new-pdf-book.component.scss']
})
export class AddNewPdfBookComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: string;
  validType: boolean = true;
  filetype: any;

  constructor(
    public dialogRef: MatDialogRef<AddNewPdfBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService
  ) { }

  ngOnInit() { }

  uploadFile(event) {
    this.validType = true;
    const { key } = this.data;
    const file = event.target.files[0];
    if (this.data.bookType.key == 1) {
      if (file.type === "application/epub+zip") {
        const filePath = `books/${key}/${file.name}`;
        this.fileName = filePath;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe();
      } else {
        this.validType = false;
        this.filetype = "epub"
      }
    } else if (this.data.bookType.key == 2) {
      if (file.type === "application/pdf") {
        const filePath = `books/${key}/${file.name}`;
        this.fileName = filePath;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file);
        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe();
      } else {
        this.validType = false;
        this.filetype = "pdf"
      }
    }

  }

  update() {
    this.downloadURL.subscribe(file => {
      this.store.updateDocUrl(this.ds.bookRef(), this.data, this.fileName, file, (success, error) => {
        if (success) {
          this.snackBar.open('Doc has been updated.', 'done', { duration: 2500 });
          this.dialogRef.close();
        }
        else {
          alert(error)
        }
      })
    })
  }

}
