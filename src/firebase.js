import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-analytics.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-storage.js"

const firebaseConfig = {
  apiKey: "AIzaSyCbJ3_D9eHRdriRkm1_mOVqtH-draigOEI",
  authDomain: "thecuteanimols.firebaseapp.com",
  projectId: "thecuteanimols",
  storageBucket: "thecuteanimols.appspot.com",
  messagingSenderId: "982049886344",
  appId: "1:982049886344:web:d3483040b7cb5487a1cf3d"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const analytics = getAnalytics

export {
  app,
  analytics,
  auth,
  db,
  storage
}
