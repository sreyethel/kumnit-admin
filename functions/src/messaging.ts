// import * as admin from 'firebase-admin'

// export function onNotificationDevices(change: any, context: any) {
//     const doc = change.after.data();
//     const { create_by, token } = doc;
//     console.log(token)
//     return admin.firestore().runTransaction(async transaction => {
//         const pushToken = token;

//         const body = "Hi " + create_by.displayName + "! Please check your Booking No. for more information.";
//         const payload = {
//             notification: {
//                 'title': 'Seat' + 'Updated',
//                 'body': body,
//                 'show_in_foreground': 'true',
//                 'vibrate': '500',
//                 'priority': "high",
//                 'sound': "default",
//                 'badge': '0'
//             }
//         };
//         const options = {
//             priority: "high",
//             content_available: true,
//         };
//         await admin.messaging().sendToTopic("eCrimeApp", payload, options);
//         return admin.messaging().sendToDevice(pushToken, payload, options).then((response) => {
//             console.log("Successfully sent message.");
//         }).catch(error => {
//             console.log("Error sending message:", error);
//         });
//     })
// }

import * as admin from 'firebase-admin'

export async function onNotificationDevices(change: any, context: any) {
    const doc = change.data();
    const { token } = doc;
    
    const pushToken = token;
    // const body = "Hi " + create_by.displayName + "! Please check your Booking No. for more information.";
    const message = {
        data: {
            title: 'GOOG up 1.43% on the day',
            body: 'GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
        },
        token: pushToken,
    };
    const payload = {
        data: {
            targetId: "123",
            body: "Urgent action is needed to prevent your account from being disabled!"
        }
    };
    const options = {
        priority: "high",
        contentAvailable: true,
        timeToLive: 60 * 60 * 24
    };
    await admin.messaging().send(message);
    await admin.messaging().sendToDevice(pushToken, payload, options)
        

    return admin.messaging().sendToTopic("eCrimeApp", payload, options)
    .then(response => {
        console.log("Successfully sent message test Token:", response);
        console.log(token)
    })
    .catch(error => {
        console.log("Error sending message:", error);
    });

}