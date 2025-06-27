
const firebaseConfig = {
  apiKey: "AIzaSyACoAyh5Ky1EUq7KepmHcvwhfziDkW1EQM",
  authDomain: "medivault-dce31.firebaseapp.com",
  projectId: "medivault-dce31",
  storageBucket: "medivault-dce31.firebasestorage.app",
  messagingSenderId: "493687940398",
  appId: "1:493687940398:web:f1d3c675a5326126f846bf",
  measurementId: "G-6TH6ZNQ25X"
};

// Initialize Firebase
const app =firebase. initializeApp(firebaseConfig);


const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();