import { DataService } from "src/app/services/data.service";
import { AngularFirestoreCollection } from "@angular/fire/firestore";
import { observable, action } from "mobx";
import { Injectable } from "@angular/core";
import { pushToArray, pushToObject } from "../services/utils.lib";
import { MappingService } from "../services/mapping.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class Bookstore {
  @observable data = [];
  @observable loading = true;
  @observable empty = false;
  @observable process = false;
  @observable dataCategory = [];
  @observable loadingUpdate: boolean = false;

  @observable dataAbout: any = null;

  @observable dataPhones: Array<any> = [];
  @observable dataEmails: Array<any> = [];

  @observable dataAllBook: Array<any> = [];

  @observable dataSearch: Array<any> = [];

  @observable dataPreview: Array<any> = [];

  constructor(public ds: DataService) {}

  @action
  async fetchGenre() {
    this.process = true;
    const docs = await this.ds.genreRef().get().toPromise();
    this.process = false;
    return pushToArray(docs);
  }

  @action
  async fetchTag() {
    this.process = true;
    const docs = await this.ds.tagRef().get().toPromise();
    this.process = false;
    return pushToArray(docs);
  }

  @action
  fetchBook(typeKey?: string) {
    this.loading = true;
    this.ds
      .bookByTypeRef(typeKey)
      .valueChanges()
      .subscribe((docs) => {
        this.data = MappingService.orderByDesc(docs, "create_date");
        this.empty = docs.length === 0;
        this.loading = false;
      });
  }

  @action
  fetchData(ref: AngularFirestoreCollection) {
    this.loading = true;
    ref.valueChanges().subscribe((docs) => {
      this.data = docs;
      this.dataCategory = docs;
      this.empty = docs.length === 0;
      this.loading = false;
    });
  }

  @action
  fetchAllBook() {
    this.ds
      .bookRef()
      .valueChanges()
      .subscribe((item: any) => {
        this.loading = true;
        this.dataAllBook = item;
        this.dataSearch = item;
        this.loading = false;
      });
  }

  @action
  filterBook(searchStr: string) {
    this.dataSearch = this.dataAllBook.filter(function (value: any) {
      return value.title.toLowerCase().indexOf(searchStr.toLowerCase()) >= 0;
    });
  }

  @action
  addNew(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .set(item)
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  update(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .update(item)
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  delete(ref: AngularFirestoreCollection, item: any, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .delete()
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  updateFileUrl(ref, item: any, fileName, fileUrl, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .update({
        fileName: fileName,
        fileUrl: fileUrl,
      })
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  updatePreviewUrl(ref, item: any, callback) {
    this.process = true;
    ref
      .doc(item.bookKey)
      .collection("preview")
      .doc(item.key)
      .set(item)
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  fetchPreview(key) {
    this.process = true;
    this.ds
      .bookRef()
      .doc(key)
      .collection("preview", (ref) => ref.orderBy("page_key", "asc"))
      .valueChanges()
      .subscribe((item: any) => {
        this.dataPreview = item;
        this.process = false;
      });
  }

  @action
  deletePreview(item) {
    this.process = true;
    this.ds
      .bookRef()
      .doc(item.bookKey)
      .collection("preview")
      .doc(item.key)
      .delete()
      .then(() => {
        this.process = false;
      });
  }

  @action
  updateSoundUrl(ref, item: any, SoundName, SoundUrl, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .update({
        SoundName: SoundName,
        SoundUrl: SoundUrl,
      })
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  updateDocUrl(ref, item: any, docName, docUrl, callback) {
    this.process = true;
    ref
      .doc(item.key)
      .update({
        docName: docName,
        docUrl: docUrl,
      })
      .then(() => {
        this.process = false;
        callback(true, item);
      })
      .catch((error) => {
        this.process = false;
        callback(false, error);
      });
  }

  @action
  fetchAbout(callback: any) {
    this.process = true;
    this.ds
      .contactRef()
      .ref.limit(1)
      .onSnapshot(async (item: any) => {
        const data = pushToArray(item);
        this.dataAbout = data[0];
        callback(this.dataAbout);
        await this.ds
          .contactRef()
          .doc(this.dataAbout.key)
          .collection("phones")
          .valueChanges()
          .subscribe((number: any) => {
            this.dataPhones = number;
          });
        await this.ds
          .contactRef()
          .doc(this.dataAbout.key)
          .collection("emails")
          .valueChanges()
          .subscribe((email: any) => {
            this.dataEmails = email;
          });
        this.process = false;
      });
  }

  @action
  addPhoneNumber(number: any) {
    this.loading = true;
    // const key = this.ds.createId()
    const Item = {
      key: this.ds.createId(),
      number: number,
    };
    this.ds
      .contactRef()
      .doc(this.dataAbout.key)
      .collection("phones")
      .doc(Item.key)
      .set(Item)
      .then(() => {
        this.loading = false;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }

  @action
  deletePhoneNumber(item: any) {
    this.ds
      .contactRef()
      .doc(this.dataAbout.key)
      .collection("phones")
      .doc(item.key)
      .delete()
      .then(() => {
        this.loading = false;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }

  @action
  addEmail(email: any) {
    this.loading = true;
    // const key = this.ds.createId()
    const Item = {
      key: this.ds.createId(),
      email: email,
    };
    this.ds
      .contactRef()
      .doc(this.dataAbout.key)
      .collection("emails")
      .doc(Item.key)
      .set(Item)
      .then(() => {
        this.loading = false;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }

  @action
  deleteEmail(item: any) {
    this.ds
      .contactRef()
      .doc(this.dataAbout.key)
      .collection("emails")
      .doc(item.key)
      .delete()
      .then(() => {
        this.loading = false;
      })
      .catch((error: any) => {
        console.log("error", error);
      });
  }

  @action
  updateAbout(item: any, about: any) {
    this.loadingUpdate = true;
    const doc = {
      about: about,
    };
    this.ds
      .contactRef()
      .doc(item.key)
      .update(doc)
      .then(() => {
        console.log("successfully update about");
        this.loadingUpdate = false;
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
}
