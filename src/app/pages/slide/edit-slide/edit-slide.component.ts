import { ConvertService } from './../../../services/convert.service';
import { DataService } from 'src/app/services/data.service';
import { Bookstore } from './../../../stores/bookstore';
import { Environment } from './../../../stores/environment.store';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ISlide } from 'src/app/interfaces/bookstore';
import { StatusObj } from 'src/app/dummy/status';

@Component({
  selector: 'app-edit-slide',
  templateUrl: './edit-slide.component.html',
  styleUrls: ['./edit-slide.component.scss']
})
export class EditSlideComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  order: AbstractControl;
  description: AbstractControl;

  constructor(
    public dialogRef: MatDialogRef<EditSlideComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public env: Environment,
    private snackBar: MatSnackBar,
    public store: Bookstore,
    private ds: DataService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [this.data.name, Validators.compose([Validators.required])],
      order: [this.data.order, Validators.required],
      description: [this.data.description]
    })
    this.name = this.form.controls['name'];
    this.order = this.form.controls["order"];
    this.description = this.form.controls["description"];
  }


  ngOnInit() {
    this.buildForm();
  }

  create(f: any) {
    if (this.form.valid) {
      this.form.disable();
      const { name, order, description } = f;
      const item: ISlide = {
        key: this.data.key,
        name: name,
        update_date: new Date(),
        update_by: this.env.user,
        description: description,
        order: order
      }
      this.store.update(this.ds.slideRef(), item, (success, error) => {
        if (success) {
          this.dialogRef.close();
          this.snackBar.open('Slide has been updated.', 'done', { duration: 2500 });
          this.form.enable();
          this.form.reset();
        }
        else {
          alert(error)
        }
      })
    }
  }

}
