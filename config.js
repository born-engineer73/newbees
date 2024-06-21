import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export const firebaseConfig = {
  apiKey: "AIzaSyCsHLo3U_4r4X81bk1oAhL39rJnhFZHSz4",
  authDomain: "newbees-6c0e9.firebaseapp.com",
  projectId: "newbees-6c0e9",
  storageBucket: "newbees-6c0e9.appspot.com",
  messagingSenderId: "663259686138",
  appId: "1:663259686138:web:1ec48941dd6aa998c4d543",
  measurementId: "G-2GKT3H0K97"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}