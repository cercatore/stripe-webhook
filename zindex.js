const admin = require('firebase-admin');
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

var serviceAccount = require("./service/service-account.json");


// Initialize Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


// Initialize Cloud Firestore and get a reference to the service
const db = admin.firestore();
const table = "stripePurchasesList"
// todo: edit random 
let val = Math.floor(Math.random() *5 ) + "db_payment_ok ";
let utente = "claudio"
function dbStruff () {
    const value = "payment_complete"

    db.collection(table).doc(utente)
          .set({ user: utente, event:value}, { merge:false});

}

const dbstuff = {
    strunz:dbStruff
}

module.exports = dbstuff;

