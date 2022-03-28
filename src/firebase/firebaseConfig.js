import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyAK4hQdzu5K1uFVkxf67GHwD6eReTfnCmg',
	authDomain: 'my-apps-34a08.firebaseapp.com',
	projectId: 'my-apps-34a08',
	storageBucket: 'my-apps-34a08.appspot.com',
	messagingSenderId: '580891462853',
	appId: '1:580891462853:web:745d21e90895bbb167f4ac',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { app, db, googleAuthProvider };
