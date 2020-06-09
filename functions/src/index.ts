import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import * as cors from "cors";
const corsHandler = cors({ origin: true });
admin.initializeApp(functions.config().firebase);
const fdb = admin.firestore();
fdb.settings({ timestampsInSnapshots: true });

import { createUserAccountFN, deleteUserAccountFN, createSubscribersAccountFN } from './userAccount';
import { onNotificationDevices } from './messaging';
import { onEditCrimeStatistic, onAddPersonCrimeStatistic, onAddCrimeStatistic, onDeleteCrimeStatistic } from './statistic';
import { addressObj, toNumber } from './mapping';

export const createSubscribersAccount = functions.firestore
  .document("/subscribers/{key}")
  .onCreate((change, context) => {
    return createSubscribersAccountFN(change, context);
  });

export const createUserAccount = functions.firestore
  .document("/users/{key}")
  .onCreate((change, context) => {
    return createUserAccountFN(change, context);
  });

export const deleteUserAccount = functions.firestore
  .document("/users/{key}")
  .onDelete((change, context) => {
    return deleteUserAccountFN(change, context);
  });


export const notificationUsers = functions.firestore
  .document("users/{key}/devices/{id}")
  .onWrite((change, context) => {
    return onNotificationDevices(change, context)
  })

// ALL STATISTIC
export const crimeStatistic = functions.firestore
  .document("/crime/{key}")
  .onCreate((change, context) => {
    return onAddCrimeStatistic(change, context);
  });

export const crimeEditStatistic = functions.firestore
  .document("/crime/{key}")
  .onUpdate((change: any, context) => {
    return onEditCrimeStatistic(change, context);
  });

export const crimeDeleteStatistic = functions.firestore
  .document("/crime/{key}")
  .onDelete((change, context) => {
    return onDeleteCrimeStatistic(change, context);
  });

export const crimePersonStatistic = functions.firestore
  .document("/crime/{key}/persons/{id}")
  .onCreate((change, context) => {
    return onAddPersonCrimeStatistic(change, context);
  });

export const deleteCrime = functions.firestore
  .document("/crime/{key}")
  .onDelete((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const crimeRef = db.collection("crime").doc(id);
    return admin.firestore().runTransaction(async transaction => {
      const weaponData = await transaction.get(crimeRef.collection("weapons"));
      const weaponDocs = weaponData.empty ? null : weaponData.docs.map(m => ({ ...m.data() }));

      const otherWeaponData = await transaction.get(crimeRef.collection("other_weapons"));
      const otherWeaponDocs = otherWeaponData.empty ? null : otherWeaponData.docs.map(m => ({ ...m.data() }));

      const notificationData = await transaction.get(crimeRef.collection("notifications"));
      const notificationDocs = notificationData.empty ? null : notificationData.docs.map(m => ({ ...m.data() }));

      const tagData = await transaction.get(crimeRef.collection("tags"));
      const tagDocs = tagData.empty ? null : tagData.docs.map(m => ({ ...m.data() }));

      if (weaponDocs && weaponDocs.length > 0) {
        weaponDocs.forEach(m => {
          transaction.delete(crimeRef.collection("weapons").doc(m.key));
        })
      }

      if (otherWeaponDocs && otherWeaponDocs.length > 0) {
        otherWeaponDocs.forEach(m => {
          transaction.delete(crimeRef.collection("other_weapons").doc(m.key));
        })
      }

      if (notificationDocs && notificationDocs.length > 0) {
        notificationDocs.forEach(m => {
          transaction.delete(crimeRef.collection("notifications").doc(m.key));
        })
      }

      if (tagDocs && tagDocs.length > 0) {
        tagDocs.forEach(m => {
          transaction.delete(crimeRef.collection("tags").doc(m.key));
        })
      }

    });
  });

export const addressCitizen = functions.firestore
  .document("/address/{key}")
  .onCreate((change: any, context: any) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CitizenId } = doc;
    const citizenRef = db.collection("citizen");
    const addressRef = db.collection("address");
    return admin.firestore().runTransaction(async transaction => {
      const citizenData = await transaction.get(citizenRef.where("id", "==", CitizenId));
      const citizenDocs = citizenData.empty ? null : citizenData.docs.map(m => ({ ...m.data() }));

      if (citizenDocs && citizenDocs.length > 0) {
        let addressArray = [];
        const { address, key } = citizenDocs[0];
        if (address) {
          addressArray = address;
          addressArray.push(addressObj(doc));
        } else {
          addressArray.push(addressObj(doc));
        }

        transaction.update(citizenRef.doc(key), { address: addressArray });
        transaction.update(addressRef.doc(id), { isUpdate: true });
      }
    });
  });

export const countCrime = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, () => {
    try {
      const db = admin.firestore();
      const crimeRef = db.collection("crime").where("isUpdate", "==", false);
      return admin.firestore().runTransaction(async transaction => {
        const crimeDoc = await transaction.get(crimeRef);
        const crimeArray = crimeDoc.empty ? null : crimeDoc.docs.map(m => ({ ...m.data() }));
        if (crimeArray && crimeArray.length > 0) {
          // crimeArray.forEach(m => {
          //   transaction.update(db.collection("crime").doc(m.key), { active: false });
          // })
          res.json({ array: crimeArray.length, message: 'ok' });
        } else {
          res.json({ message: "done" });
        }
      });
    } catch (error) {
      return "error";
    }
  });
});

export const addCrimeDetectives = functions.firestore
  .document("/crime_detectives_import/{key}")
  .onCreate((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CrimeId, DetectiveId } = doc;
    const crimeDetectivesImportRef = db.collection("crime_detectives_import").doc(id);
    const crimeRef = db.collection("crime");
    const detectiveRef = db.collection("detectives");
    const crimeDetectiveRef = db.collection("crime_detective");
    return admin.firestore().runTransaction(async transaction => {
      const crimeData = await transaction.get(crimeRef.where("id", "==", CrimeId));
      const crimeDocs = crimeData.empty ? null : crimeData.docs.map(m => ({ ...m.data() }));

      const detectiveData = await transaction.get(detectiveRef.where("id", "==", toNumber(DetectiveId)));
      const detectiveDocs = detectiveData.empty ? null : detectiveData.docs.map(m => ({ ...m.data() }));

      if ((crimeDocs && crimeDocs.length > 0) && (detectiveDocs && detectiveDocs.length > 0)) {

        const data = {
          key: id,
          crime: crimeDocs[0],
          detective: detectiveDocs[0],
        }
        const crimeKey = crimeDocs[0].key;
        transaction.set(crimeRef.doc(crimeKey).collection("crime_detective").doc(data.key), data);
        transaction.set(crimeDetectiveRef.doc(data.key), data);

        transaction.update(crimeDetectivesImportRef, { isUpdate: true });
      }

    });
  });

export const addCrimeToolbox = functions.firestore
  .document("/crime_toolboxs_import/{key}")
  .onCreate((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CrimeId, ToolboxId } = doc;
    const crimeDetectivesImportRef = db.collection("crime_toolboxs_import").doc(id);
    const crimeRef = db.collection("crime");
    const detectiveRef = db.collection("other-transportation");
    return admin.firestore().runTransaction(async transaction => {
      const crimeData = await transaction.get(crimeRef.where("id", "==", CrimeId));
      const crimeDocs = crimeData.empty ? null : crimeData.docs.map(m => ({ ...m.data() }));

      const detectiveData = await transaction.get(detectiveRef.where("id", "==", toNumber(ToolboxId)));
      const detectiveDocs = detectiveData.empty ? null : detectiveData.docs.map(m => ({ ...m.data() }));

      if ((crimeDocs && crimeDocs.length > 0) && (detectiveDocs && detectiveDocs.length > 0)) {

        const data = detectiveDocs[0]
        const crimeKey = crimeDocs[0].key;
        transaction.set(crimeRef.doc(crimeKey).collection("other_weapons").doc(data.key), data);

        transaction.update(crimeDetectivesImportRef, { isUpdate: true });
      }

    });
  });

export const addCrimeWeapon = functions.firestore
  .document("/crime_weapons_import/{key}")
  .onCreate((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CrimeId, WeaponId } = doc;
    const crimeDetectivesImportRef = db.collection("crime_weapons_import").doc(id);
    const crimeRef = db.collection("crime");
    const detectiveRef = db.collection("weapons");
    return admin.firestore().runTransaction(async transaction => {
      const crimeData = await transaction.get(crimeRef.where("id", "==", CrimeId));
      const crimeDocs = crimeData.empty ? null : crimeData.docs.map(m => ({ ...m.data() }));

      const detectiveData = await transaction.get(detectiveRef.where("id", "==", toNumber(WeaponId)));
      const detectiveDocs = detectiveData.empty ? null : detectiveData.docs.map(m => ({ ...m.data() }));

      if ((crimeDocs && crimeDocs.length > 0) && (detectiveDocs && detectiveDocs.length > 0)) {

        const data = detectiveDocs[0]
        const crimeKey = crimeDocs[0].key;
        transaction.set(crimeRef.doc(crimeKey).collection("weapons").doc(data.key), data);

        transaction.update(crimeDetectivesImportRef, { isUpdate: true });
      }

    });
  });

export const addSuspect = functions.firestore
  .document("/suspects/{key}")
  .onCreate((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CrimeId, CitizenId } = doc;
    const suspectRef = db.collection("suspects").doc(id);
    const crimeRef = db.collection("crime");
    const citizenRef = db.collection("citizen");
    return admin.firestore().runTransaction(async transaction => {
      const crimeData = await transaction.get(crimeRef.where("id", "==", CrimeId));
      const crimeDocs = crimeData.empty ? null : crimeData.docs.map(m => ({ ...m.data() }));

      const citizenData = await transaction.get(citizenRef.where("id", "==", CitizenId));
      const citizenDocs = citizenData.empty ? null : citizenData.docs.map(m => ({ ...m.data() }));

      if ((crimeDocs && crimeDocs.length > 0) && (citizenDocs && citizenDocs.length > 0)) {

        const crime = crimeDocs[0];
        const citizen = citizenDocs[0];
        const crimeKey = crimeDocs[0].key;
        transaction.set(crimeRef.doc(crimeKey).collection("suspects").doc(doc.key), {
          ...doc,
          isUpdate: true,
          crime: crime,
          citizen: citizen,
        });

        transaction.update(suspectRef, {
          isUpdate: true,
          crime: crime,
          citizen: citizen,
        });
      }

    });
  });

export const addVictims = functions.firestore
  .document("/victims/{key}")
  .onCreate((change: any, context) => {
    const doc = change.data();
    const id = doc.key;
    const db = admin.firestore();
    const { CrimeId, CitizenId } = doc;
    const suspectRef = db.collection("victims").doc(id);
    const crimeRef = db.collection("crime");
    const citizenRef = db.collection("citizen");
    return admin.firestore().runTransaction(async transaction => {
      const crimeData = await transaction.get(crimeRef.where("id", "==", CrimeId));
      const crimeDocs = crimeData.empty ? null : crimeData.docs.map(m => ({ ...m.data() }));

      const citizenData = await transaction.get(citizenRef.where("id", "==", CitizenId));
      const citizenDocs = citizenData.empty ? null : citizenData.docs.map(m => ({ ...m.data() }));

      if ((crimeDocs && crimeDocs.length > 0) && (citizenDocs && citizenDocs.length > 0)) {

        const crime = crimeDocs[0];
        const citizen = citizenDocs[0];
        const crimeKey = crimeDocs[0].key;
        transaction.set(crimeRef.doc(crimeKey).collection("victims").doc(doc.key), {
          ...doc,
          isUpdate: true,
          crime: crime,
          citizen: citizen,
        });

        transaction.update(suspectRef, {
          isUpdate: true,
          crime: crime,
          citizen: citizen,
        });
      }

    });
  });