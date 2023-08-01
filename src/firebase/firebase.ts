import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyA1A8aM-5zfKM09g1qHYDS3NRnVcHh6e2g',
    authDomain: 'blog-app-2ebc7.firebaseapp.com',
    projectId: 'blog-app-2ebc7',
    storageBucket: 'blog-app-2ebc7.appspot.com',
    messagingSenderId: '883186357994',
    appId: '1:883186357994:web:eb34a9e680647a2aad2993',
    measurementId: 'G-YCWW7TY30B',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
