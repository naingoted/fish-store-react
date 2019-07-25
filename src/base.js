import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBzE6_XgPPiUhJQBAq63iyAXQWp1wPpDnk",
    authDomain: "catch-of-the-day-b56a9.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-b56a9.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;
