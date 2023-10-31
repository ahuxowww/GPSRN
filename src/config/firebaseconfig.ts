// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
  appId: '1:204042669842:web:8b304502976c178f7dadcb',
};

// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export {firebase};
export const db = getDatabase();
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STORE = firebase.firestore();
