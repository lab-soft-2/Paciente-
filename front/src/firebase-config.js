import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBTMBKmKMQHUqsTWYCLtaDiefI-1QWmz_c",
    authDomain: "involuted-reach-417818.firebaseapp.com",
    projectId: "involuted-reach-417818",
    storageBucket: "involuted-reach-417818.appspot.com",
    messagingSenderId: "50381103840",
    appId: "1:50381103840:web:e51fb393dd16ef4f7aa685"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export default app