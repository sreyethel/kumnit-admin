import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc, checkExistOnEdit } from './../../../services/fire-validators.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ITag } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.scss']
})
export class EditTagsComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditTagsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private afs: AngularFirestore,
    private ds: DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required]), checkExistOnEdit(this.afs, "tags", "name", this.data.name)],
    })
    this.name = this.form.controls['name'];
  }

  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name } = f;
      const item: ITag = {
        key: this.data.key,
        name: name,
        update_date: new Date(),
        update_by: this.env.user,
      }
      this.store.update(this.ds.tagRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Tag has been updated.', 'done', { duration: 2500 });
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
