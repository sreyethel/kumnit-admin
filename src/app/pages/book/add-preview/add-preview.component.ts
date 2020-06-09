import { Component, OnInit, Inject } from "@angular/core";
import { finalize } from "rxjs/internal/operators/finalize";
import { Observable } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AddNewCoverBookComponent } from "../add-new-cover-book/add-new-cover-book.component";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import { Environment } from "src/app/stores/environment.store";
import { Bookstore } from "src/app/stores/bookstore";
import { DataService } from "src/app/services/data.service";
import { ConvertService } from "src/app/services/convert.service";

@Component({
  selector: "app-add-preview",
  templateUrl: "./add-preview.component.html",
  styleUrls: ["./add-preview.component.scss"],
})
export class AddPreviewComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL;
  fileName: string;
  task: AngularFireUploadTask;

  constructor(
    public dialogRef: MatDialogRef<AddNewCoverBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: AngularFireStorage,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService
  ) {}

  ngOnInit() {
    this.store.fetchPreview(this.data.key);
  }

  _onDelete(item) {
    this.store.deletePreview(item);
  }

  async uploadFile(event) {
    const docs = event.target.files;
    const file = Array.from(docs);
    this.store.process = true;
    file.map(async (item: any) => {
      const key = this.ds.createId();
      const filePath = `books/preview/${key}/${item.name}`;
      this.fileName = filePath;
      const fileRef = this.storage.ref(filePath);
      const task = await this.storage.upload(filePath, item);
      // this.uploadPercent = await task.percentageChanges();
      await fileRef.getDownloadURL().subscribe((item) => {
        const fileItem = {
          key: key,
          bookKey: this.data.key,
          fileUrl: item,
          page_key: ConvertService.pageKey(),
          create_date: new Date(),
        };
        this.store.updatePreviewUrl(
          this.ds.bookRef(),
          fileItem,
          (success, error) => {
            if (success) {
              this.snackBar.open("uploaded file", "done", { duration: 1000 });
            } else {
              alert(error);
            }
          }
        );
      });
    });
  }

  // update() {
  //   this.downloadURL.subscribe((file) => {
  //     this.store.updateFileUrl(
  //       this.ds.bookRef(),
  //       this.data,
  //       this.fileName,
  //       file,
  //       (success, error) => {
  //         if (success) {
  //           this.snackBar.open("Cover has been updated.", "done", {
  //             duration: 2500,
  //           });
  //           this.dialogRef.close();
  //         } else {
  //           alert(error);
  //         }
  //       }
  //     );
  //   });
  // }
}
