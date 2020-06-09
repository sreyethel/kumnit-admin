import { PhoneNumber } from "./../../services/phoneNumber.service";
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
import { FireValidatorsService } from "../../services/fire-validators.service";
import { IUser } from "src/app/interfaces/user";
import { WindowService } from "src/app/services/window.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.scss"]
})
export class AddUserComponent implements OnInit {
  @ViewChild("focusInput") inputEl: ElementRef;
  form: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  phone: AbstractControl;
  province: AbstractControl;
  district: AbstractControl;
  commune: AbstractControl;
  description: AbstractControl;
  isPhone: AbstractControl;
  verify: AbstractControl;
  recaptcha: AbstractControl;
  role: AbstractControl;

  filteredStatesProvince: any;
  filteredStatesDistrict: any;
  filteredStatesCommune: any;

  windowRef: any;
  phoneNumber = new PhoneNumber();
  verificationCode: string;
  user: any;
  url = 'https://firebasestorage.googleapis.com/v0/b/ecrime-6aadb.appspot.com/o/userpic.svg?alt=media&token=57515eb6-b254-4689-91a5-16dde7947f79';
  byPhone: boolean = false;
  myPhone: any;

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private afs: AngularFirestore,
    public store: Environment,
    private win: WindowService
  ) { }

  buildForm(): void {
    this.form = this.fb.group({
      name: [
        null,
        Validators.compose([Validators.required]),
        FireValidatorsService.checkExist(this.afs, "geo_provinces", "code")
      ],
      email: [null, [Validators.required]],
      description: [null],
      phone: [null, [Validators.required]],
      province: [
        null,
        [Validators.required, MappingService.validSelected.bind(this)]
      ],
      district: [{ value: null, disabled: true }, [Validators.required]],
      commune: [{ value: null, disabled: true }, [Validators.required]],
      isPhone: [false, [Validators.required]],
      verify: [
        { value: null, disabled: true },
        Validators.compose([Validators.required])
      ],
      recaptcha: [null],
      role: null
    });
    this.name = this.form.controls["name"];
    this.description = this.form.controls["description"];
    this.email = this.form.controls["email"];
    this.phone = this.form.controls["phone"];
    this.province = this.form.controls["province"];
    this.district = this.form.controls["district"];
    this.commune = this.form.controls["commune"];
    this.isPhone = this.form.controls["isPhone"];
    this.verify = this.form.controls["verify"];
    this.recaptcha = this.form.controls["recaptcha"];
    this.role = this.form.controls["role"]
  }

  displayItem(item: any): string {
    return item ? item.name : item;
  }

  ngOnInit() {
    this.buildForm();
    this.windowRef = this.win.windowRef;
    // this.windowRef.recaptchaVerifier = this.auth.getRecaptchaVerifier();
    this.windowRef.recaptchaVerifier.render();
    // this.geo.fetchProvinceToArray(list => {
    //   this.filteredStatesProvince = MappingService.autoComplete(
    //     this.province,
    //     list,
    //     "name"
    //   );
    // });
  }

  _onSelectedProvince(event) {
    const { value } = event.option;
    if (value) {
      this.district.enable();
      // this.geo.fetchDistrictsToArray(value.key, list => {
      //   this.filteredStatesDistrict = MappingService.autoComplete(
      //     this.district,
      //     list,
      //     "name"
      //   );
      // });
    } else {
      this.district.disable();
    }
  }
  _onSelectedDistrict(event) {
    const { value } = event.option;
    if (value) {
      this.commune.enable();
      // this.geo.fetchCommunesToArray(value.key, list => {
      //   this.filteredStatesCommune = MappingService.autoComplete(
      //     this.commune,
      //     list,
      //     "name"
      //   );
      // });
    } else {
      this.commune.disable();
    }
  }

  _changeToPhone(event) {
    const { checked } = event;
    this.byPhone = checked;
    if (checked) this.verify.enable();
    else this.verify.disable();
  }

  onVerifyCode() {
    const { value } = this.verify;
    if (value) {
      this.windowRef.confirmationResult
        .confirm(value)
        .then(result => {
          if (result) {
            const { user } = result;
            const { uid } = user;
            const { province, district, commune, email, phone, description, role, name } = this.form.value;
            const account: IUser = {
              key: uid,
              status: status[0],
              create_date: new Date(),
              create_by: this.store.user,
              province: province,
              district: district,
              commune: commune,
              email: email,
              phone: phone,
              displayName: name,
              url: this.url,
              description: description,
              role: role,
            }
            this.store.addUser(account, (success, error) => {
              if (success) {
                user.updateProfile({
                  displayName: name,
                  photoURL: this.url,
                  email: email,
                })
                this.myPhone = null;
                this.dialogRef.close();
                this.snackBar.open('Account has been created.', 'done', { duration: 5000 });
              }
              else {
                alert(error)
              }
            })
          }
        })
        .catch(error => alert(error));
    }
  }

  onSendCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const { phone } = this.form.value;
    const num = `+855${phone}`;
    this.myPhone = num;
    // this.auth.signInWithPhoneNumber(num, appVerifier)
    //   .then(result => {
    //     this.windowRef.confirmationResult = result;
    //   })
    //   .catch(error => alert(error));
  }

  create(f: any, isNew) {
    if (this.form.valid) {
      const appVerifier = this.windowRef.recaptchaVerifier;
      const num = this.phoneNumber.e164;
      // this.auth.signInWithPhoneNumber(num, appVerifier)
      //   .then(result => {
      //     this.windowRef.confirmationResult = result;
      //   })
      //   .catch(error => alert(error));

      // const key = this.afs.createId();
      // const formData: IUser = {
      //   key: key,
      //   code: f.name,
      //   description: f.description,
      //   name: f.shortName,
      //   status: status[0],
      //   create_date: new Date(),
      //   create_by: this.auth.getUser(),
      // }
      // this.fs.addProvince(formData, (success, error) => {
      //   if (success) {
      //     if (!isNew)
      //       this.dialogRef.close();
      //     this.snackBar.open('Province has been created.', 'done', { duration: 5000 });
      //     this.form.reset();
      //     this.inputEl.nativeElement.focus();
      //   }
      //   else {
      //     alert(error)
      //   }
      // })
    }
  }
}
