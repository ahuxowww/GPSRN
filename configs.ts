// Import the functions you need from the SDKs you need
import {getDatabase} from 'firebase/database';
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDc_9V9JyBhoNmjQ8Uhl1sz-N3sWOFaHwU',
  authDomain: 'test-gps-e2521.firebaseapp.com',
  databaseURL:
    'https://test-gps-e2521-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'test-gps-e2521',
  storageBucket: 'test-gps-e2521.appspot.com',
  messagingSenderId: '204042669842',
  appId: '1:204042669842:web:15394fa3dedaa1ec7dadcb',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();
export {db};
