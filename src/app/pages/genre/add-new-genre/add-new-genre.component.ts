import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { checkExistDoc } from './../../../services/fire-validators.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { IGenre } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-add-new-genre',
  templateUrl: './add-new-genre.component.html',
  styleUrls: ['./add-new-genre.component.scss']
})
export class AddNewGenreComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  icon: AbstractControl;
  subtitle: AbstractControl;
  topGenre: AbstractControl;
  order: AbstractControl

  constructor(
    public dialogRef: MatDialogRef<AddNewGenreComponent>,
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
      name: [null, Validators.compose([Validators.required]), checkExistDoc(this.afs, "genres", "name")],
      order: [null],
      icon: [null],
      subtitle: [null],
      topGenre: [false, Validators.required]
    })
    this.name = this.form.controls['name'];
    this.icon = this.form.controls["icon"];
    this.subtitle = this.form.controls["subtitle"];
    this.topGenre = this.form.controls["topGenre"];
    this.order = this.form.controls["order"];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { name, icon, subtitle, topGenre, order } = f;
      const item: IGenre = {
        key: this.ds.createId(),
        name: name,
        status: StatusObj.ACTIVE,
        create_date: new Date(),
        create_by: this.env.user,
        page_key: ConvertService.pageKey(),
        update_date: new Date(),
        update_by: this.env.user,
        icon: icon,
        subtitle: subtitle,
        isTop: topGenre,
        order: order
      }
      this.store.addNew(this.ds.genreRef(), item, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('Genre has been created.', 'done', { duration: 2500 });
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
