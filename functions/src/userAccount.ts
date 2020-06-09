import * as admin from "firebase-admin";

export function createSubscribersAccountFN(change: any, context: any) {
  const doc = change.data();
  const key = change.id;
  return admin.firestore().runTransaction(async (transaction) => {
    const { phone, full_name } = doc;
    const url = 'https://firebasestorage.googleapis.com/v0/b/sysanotta.appspot.com/o/no_image.svg?alt=media&token=f25af902-6c62-47e6-bdf3-48e3b0c6fe8c';
    return admin.auth().createUser({
      // email: email,
      phoneNumber: phone,
      password: "012285599",
      displayName: full_name,
      disabled: false,
      emailVerified: false,
      photoURL: url,
      uid: key
    });
  });
}

export function createUserAccountFN(change: any, context: any) {
  const doc = change.data();
  const key = change.id;
  return admin.firestore().runTransaction(async (transaction) => {
    const { email, full_name } = doc;
    const url = 'https://firebasestorage.googleapis.com/v0/b/sysanotta.appspot.com/o/no_image.svg?alt=media&token=f25af902-6c62-47e6-bdf3-48e3b0c6fe8c';
    return admin.auth().createUser({
      email: email,
      password: "012285599",
      displayName: full_name,
      disabled: false,
      emailVerified: false,
      photoURL: url,
      uid: key
    });
  });
}

export function deleteUserAccountFN(change: any, context: any) {
  const doc = change.data();
  const { email } = doc;
  return admin.firestore().runTransaction(async (transaction) => {
    return admin.auth().getUserByEmail(email).then(user => {
      return admin.auth().deleteUser(user.uid);
    })
  });
}
