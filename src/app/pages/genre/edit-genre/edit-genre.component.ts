import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc, checkExistOnEdit } from './../../../services/fire-validators.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { IGenre } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss']
})
export class EditGenreComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  icon: AbstractControl;
  subtitle: AbstractControl;
  topGenre: AbstractControl;
  order: AbstractControl

  constructor(
    public dialogRef: MatDialogRef<EditGenreComponent>,
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
      name: [this.data.name, Validators.compose([Validators.required]), checkExistOnEdit(this.afs, "genres", "name", this.data.name)],
      icon: [null],
      order: [this.data.order],
      subtitle: [this.data.subtitle],
      topGenre: [null, Validators.required]
    })
    this.name = this.form.controls['name'];
    this.icon = this.form.controls["icon"];
    this.subtitle = this.form.controls["subtitle"];
    this.topGenre = this.form.controls["topGenre"];
    this.order = this.form.controls["order"];
  }

  ngOnInit() {
    this.buildForm();
    this.topGenre.patchValue(this.data.isTop);
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name, icon, subtitle, topGenre, order } = f;
      const item: IGenre = {
        key: this.data.key,
        name: name,
        update_date: new Date(),
        update_by: this.env.user,
        icon: null,
        subtitle: subtitle,
        isTop: topGenre ? topGenre : false,
        order: order
      }
      this.store.update(this.ds.genreRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Genre has been updated.', 'done', { duration: 2500 });
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
