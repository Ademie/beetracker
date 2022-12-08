import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyDaFa1LeyaQbnnNKduDd_n4T46nSgLnUzw",
  authDomain: "tracker-16427.firebaseapp.com",
  projectId: "tracker-16427",
  storageBucket: "tracker-16427.appspot.com",
  messagingSenderId: "509750841214",
  appId: "1:509750841214:web:6bd2ec11c02aabec01ad2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export authentication
export const auth = getAuth()
// intialize db
export const db = getFirestore(app)
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
