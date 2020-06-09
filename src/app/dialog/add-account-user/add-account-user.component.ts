import { MappingService } from "./../../services/mapping.service";
import { Environment } from "./../../stores/environment.store";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import {
  FormGroup,
  AbstractControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { IUser } from "src/app/interfaces/user";
import { ConvertService } from 'src/app/services/convert.service';

@Component({
  selector: 'app-add-account-user',
  templateUrl: './add-account-user.component.html',
  styleUrls: ['./add-account-user.component.scss']
})
export class AddAccountUserComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  position: AbstractControl;
  title: AbstractControl;
  first_name: AbstractControl;
  last_name: AbstractControl;
  gender: AbstractControl;
  dob: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;
  address: AbstractControl;

  facebook: AbstractControl;
  telegram: AbstractControl;
  description: AbstractControl;
  role: AbstractControl;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;

  url = 'https://firebasestorage.googleapis.com/v0/b/ecrime-6aadb.appspot.com/o/userpic.svg?alt=media&token=57515eb6-b254-4689-91a5-16dde7947f79';
  genderList:any;
  roleList:any;
  positionList = [];
  titleList = [];

  constructor(
    public dialogRef: MatDialogRef<AddAccountUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Environment,
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      position: [null, Validators.required],
      title: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      gender: [this.genderList[0], Validators.required],
      dob: [new Date(), Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      province: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      district: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      commune: [null, [Validators.required, MappingService.validSelected.bind(this)]],
      address: [null],
      facebook: [null],
      telegram: [null],
      description: [null],
      role: [this.roleList[0], Validators.required]
    });
    this.position = this.form.controls["position"];
    this.title = this.form.controls["title"];
    this.first_name = this.form.controls["first_name"];
    this.last_name = this.form.controls["last_name"];
    this.gender = this.form.controls["gender"];
    this.dob = this.form.controls["dob"];
    this.email = this.form.controls["email"];
    this.phone = this.form.controls["phone"];
    this.province = this.form.controls["province"];
    this.district = this.form.controls["district"];
    this.commune = this.form.controls["commune"];
    this.address = this.form.controls["address"];
    this.facebook = this.form.controls["facebook"];
    this.telegram = this.form.controls["telegram"];
    this.description = this.form.controls["description"];
    this.role = this.form.controls["role"]
  }

  ngOnInit() {
    this.buildForm();
    // this.geo.fetchPositionToArray(p => {
    //   this.positionList = p;
    //   if (this.positionList.length > 0) {
    //     this.position.patchValue(this.positionList[0])
    //   }
    // })
    // this.geo.fetchTitleToArray(t => {
    //   this.titleList = t;
    //   if (this.titleList.length > 0) {
    //     this.title.patchValue(this.titleList[0])
    //   }
    // })
    // this.geo.fetchProvinceToArray(list => {
    //   this.filteredStatesProvince = MappingService.autoComplete(
    //     this.province,
    //     list,
    //     "name"
    //   );
    // });
  }

  _onSelectedProvince(event) {
    // const { value } = event.option;
    // if (value) {
    //   this.district.enable();
    //   this.geo.fetchDistrictsToArray(value.key, list => {
    //     this.filteredStatesDistrict = MappingService.autoComplete(
    //       this.district,
    //       list,
    //       "name"
    //     );
    //   });
    // } else {
    //   this.district.disable();
    // }
  }

  _onSelectedDistrict(event) {
    // const { value } = event.option;
    // if (value) {
    //   this.commune.enable();
    //   this.geo.fetchCommunesToArray(value.key, list => {
    //     this.filteredStatesCommune = MappingService.autoComplete(
    //       this.commune,
    //       list,
    //       "name"
    //     );
    //   });
    // } else {
    //   this.commune.disable();
    // }
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o2) return o1.key === o2.key;
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      this.form.disable();
      const { province, district, commune, address, email, phone, facebook, telegram, first_name, last_name, gender, dob, description, role, position, title } = f;

      const phoneNumber = phone.replace(/\s/g, '');
      const formData: IUser = {
        key: this.afs.createId(),
        province: province,
        district: district,
        commune: commune,
        address: address,
        email: email,
        phone: "+855" + phoneNumber,
        phoneNumber: phoneNumber,
        facebook: facebook,
        telegram: telegram,
        pin_code: null,
        displayName: last_name + ' ' + first_name,
        first_name: first_name,
        last_name: last_name,
        full_name: last_name + ' ' + first_name,
        position: position,
        title: title,
        gender: gender,
        dob: dob,
        dob_key: ConvertService.toDateKey(dob),
        url: this.url,
        description: description,
        role: role,
        status: status[0],
        page_key: ConvertService.pageKey(),
        create_date: new Date(),
        create_by: this.store.user,
      }

      this.store.addUser(formData, (success, error) => {
        if (success) {
          if (!isNew)
            this.dialogRef.close();
          this.snackBar.open('គណនីត្រូវបានបង្កើត', 'ដោយជោគជ័យ', { duration: 3000 });
          this.form.reset();
          this.form.enable();
          this.inputEl.nativeElement.focus();
        }
        else {
          alert(error)
        }
      })
    }
  }
}
