import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeRTFYnu7FqTI9MN_KUIdphhsOkw25r6M",
  authDomain: "react-chat-app-d5493.firebaseapp.com",
  projectId: "react-chat-app-d5493",
  storageBucket: "react-chat-app-d5493.appspot.com",
  messagingSenderId: "687329716215",
  appId: "1:687329716215:web:68fd117a84e2dc1fa6b0f2",
  measurementId: "G-ZJ2R3WP4ML",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

firebase.analytics();

export { auth, provider };
export default db;
