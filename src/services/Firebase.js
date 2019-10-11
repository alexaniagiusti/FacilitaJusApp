import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
//import "firebase/messaging";

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

let sBrowser;
const sUsrAg = navigator.userAgent;

if (sUsrAg.indexOf("Chrome") > -1) {
  sBrowser = "Google Chrome";
} else if (sUsrAg.indexOf("Safari") > -1) {
  sBrowser = "Apple Safari";
} else if (sUsrAg.indexOf("Opera") > -1) {
  sBrowser = "Opera";
} else if (sUsrAg.indexOf("Firefox") > -1) {
  sBrowser = "Mozilla Firefox";
} else if (sUsrAg.indexOf("MSIE") > -1) {
  sBrowser = "Microsoft Internet Explorer";
}

let m = "";
//if (sBrowser !== "Apple Safari") {
//  m = f.messaging();
//}

export const db = f.database();
export const auth = f.auth();
export const messaging = m;
