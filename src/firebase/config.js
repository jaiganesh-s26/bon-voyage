// This file connects our app to the Firebase project you created
// on the Firebase website. It's safe for these specific values to
// live in frontend code — they identify which project to talk to,
// they are not secret passwords.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCkkK1ObzTT-htNINw8DACNX_PDKoYy2qc",
  authDomain: "bon-voyage-ea65e.firebaseapp.com",
  projectId: "bon-voyage-ea65e",
  storageBucket: "bon-voyage-ea65e.firebasestorage.app",
  messagingSenderId: "352383751688",
  appId: "1:352383751688:web:4c0561ffaa23592442a3bd"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)