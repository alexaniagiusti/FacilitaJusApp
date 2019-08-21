import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyAHB61SbrxePljc9_KHeIkHpwdDMhH6Ie8",
  authDomain: "facilitajus-e142e.firebaseapp.com",
  databaseURL: "https://facilitajus-e142e.firebaseio.com",
  projectId: "facilitajus-e142e",
  storageBucket: "",
  messagingSenderId: "946961257063",
  appId: "1:946961257063:web:04723c6653d1f5f8"
};

const f = firebase.initializeApp(config);

export const db = f.database();
export const auth = f.auth();
