import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAlpsTHbrC31orKgK9lRriOdvWBnqTdCKo",
    authDomain: "tuvoice-f4eee.firebaseapp.com",
    databaseURL: "https://tuvoice-f4eee.firebaseio.com",
    projectId: "tuvoice-f4eee",
    storageBucket: "tuvoice-f4eee.appspot.com",
    messagingSenderId: "700657120550"

}

firebase.initializeApp(config);

export default firebase;
