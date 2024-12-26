import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBWf42yIQLkqZzKK57OK0AIaAd4kLkU5Rk",
    authDomain: "pascal-learning.firebaseapp.com",
    projectId: "pascal-learning",
    storageBucket: "pascal-learning.firebasestorage.app",
    messagingSenderId: "62511163956",
    appId: "1:62511163956:web:d734a22bb9ff3f0aa93861"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)