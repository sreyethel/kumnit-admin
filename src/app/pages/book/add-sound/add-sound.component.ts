import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { AddNewPdfBookComponent } from '../add-new-pdf-book/add-new-pdf-book.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { Environment } from 'src/app/stores/environment.store';
import { Bookstore } from 'src/app/stores/bookstore';
import { DataService } from 'src/app/services/data.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-sound',
  templateUrl: './add-sound.component.html',
  styleUrls: ['./add-sound.component.scss']
})
export class AddSoundComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: string;
  validType: boolean = true;
  filetype: any;

  constructor(
    public dialogRef: MatDialogRef<AddSoundComponent>,
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
   
      const filePath = `sounds/${key}/${file.name}`;
      this.fileName = filePath;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      this.uploadPercent = task.percentageChanges();
      task.snapshotChanges().pipe(finalize(() => this.downloadURL = fileRef.getDownloadURL())).subscribe();
   
      // this.validType = false;
      // this.filetype = "mp3"
    

  }

  update() {
    this.downloadURL.subscribe(file => {
      this.store.updateSoundUrl(this.ds.bookRef(), this.data, this.fileName, file, (success, error) => {
        if (success) {
          this.snackBar.open('Sound has been updated.', 'done', { duration: 2500 });
          this.dialogRef.close();
        }
        else {
          alert(error)
        }
      })
    })
  }

}
