import { ConvertService, toNearExpiredDate } from './convert.service';
import { ITag, IGenre, ISlide, IBook } from './../interfaces/bookstore';
import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { IProduct, ISubscriber } from '../interfaces/subscriber';

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private db: AngularFirestore) { }

  baseDocRef(col: string) {
    return this.db.collection(`${col}`);
  }

  userRef() {
    return this.db.collection("users");
  }

  userDocRef(key: string) {
    return this.db.collection("users").doc<any>(key);
  }

  environmentRef() {
    return this.db.collection("crime_environment").doc("crime_environment");
  }

  sysConfigRef() {
    return this.db.collection("sys_config").doc("settings");
  }

  tagRef() {
    return this.db.collection<ITag>("tags", ref => ref.orderBy("name"));
  }

  tagValidRef(keyword: string) {
    return this.db.collection<ITag>("tags", ref => ref.where("name", "==", keyword));
  }

  genreRef() {
    return this.db.collection<IGenre>("genres", ref => ref.orderBy("name"));
  }

  genreValidRef(keyword: string) {
    return this.db.collection<IGenre>("genres", ref => ref.where("name", "==", keyword));
  }


  slideRef() {
    return this.db.collection<ISlide>("slides", ref => ref.orderBy("order"));
  }

  contactRef() {
    return this.db.collection('contact');
  }

  bookRef() {
    return this.db.collection<IBook>("books", ref => ref.orderBy("title"));
  }

  bookByTypeRef(typeKey?: string) {
    if (typeKey != "data") {
      return this.db.collection<IBook>("books", ref => ref
        .where("genre.key", "==", typeKey));
    } else {
      return this.db.collection<IBook>("books", ref => ref.orderBy("title"));
    }
  }

  productRef() {
    return this.db.collection<IProduct>("products", ref => ref.orderBy("period"));
  }

  subscriberTypesRef(id: string) {
    switch (id) {
      case 'approval_accounts':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'membership':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("product.period", ">", 0)
          .orderBy("product.period")
          .orderBy("page_key"));
      case 'expired':
        const expiredDateKey = ConvertService.toDateKey(new Date())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", expiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'near-expire':
        const nearExpiredDateKey = ConvertService.toDateKey(toNearExpiredDate())
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", true)
          .where("expiredDateKey", "<", nearExpiredDateKey)
          .orderBy("expiredDateKey")
          .orderBy("page_key"));
      case 'approval':
        return this.db.collection<ISubscriber>("subscribers", ref => ref
          .where("isPaid", "==", false)
          .where("product", "==", null)
          .orderBy("fullName", 'asc'));
      default:
        return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("fullName", 'asc'));
    }
  }

  settingFireStore() {
    return this.firestore().collection("options").doc("general");
  }

  sysSetting() {
    return this.db.collection("options").doc("general");
  }

  subscriberFireRef() {
    return this.firestore().collection("subscribers");
  }

  invoiceFireRef() {
    return this.firestore().collection("invoices");
  }

  subscriberRef() {
    return this.db.collection<ISubscriber>("subscribers", ref => ref.orderBy("page_key"));
  }

  subscriberSearchRef(field) {
    return this.db.collection("subscribers", ref => ref.orderBy(field, "desc")
      .limit(20)
    );
  }

  subscriberFilterRef(field: string, text: any) {
    let search = text;
    if (field === "phone") search = `+855${ConvertService.toNumber(search)}`
    if (search) {
      if (search.key) {
        return this.db.collection("subscribers", ref =>
          ref
            .where("phoneNumber", ">=", search.key)
            .orderBy(field)
            .limit(20)
        );
      }
      return this.db.collection("subscribers", ref =>
        ref
          .where(field, ">=", search)
          .orderBy(field)
          .limit(20)
      );
    }
    return this.db.collection("subscribers", ref =>
      ref
        .orderBy(field, "desc")
        .limit(20)
    );

  }

  batch() {
    return this.db.firestore.batch();
  }

  firestore() {
    return this.db.firestore;
  }

  createId() {
    return this.db.createId();
  }


}
