const firebaseConfig = {
  apiKey: "AIzaSyDLjE3tjuhamiB916unRFMMdoG_9NtzYsQ",
  authDomain: "gerenciadordemandasti.firebaseapp.com",
  databaseURL: "https://gerenciadordemandasti-default-rtdb.firebaseio.com",
  projectId: "gerenciadordemandasti",
  storageBucket: "gerenciadordemandasti.firebasestorage.app",
  messagingSenderId: "50717737686",
  appId: "1:50717737686:web:2befb49d5b2789aa7cff77"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
