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

const firebaseConfigTest = {
	apiKey: 'AIzaSyC8qF3C-bmIKz6kIMUOJBq9soDx1nlr7-U',
	authDomain: 'test-apps-cfe8f.firebaseapp.com',
	projectId: 'test-apps-cfe8f',
	storageBucket: 'test-apps-cfe8f.appspot.com',
	messagingSenderId: '219483725150',
	appId: '1:219483725150:web:7f2f2669b4432e4f9003cf',
};

if (process.env.NODE_ENV === 'test') {
	initializeApp(firebaseConfigTest);
} else {
	initializeApp(firebaseConfig);
}

// Initialize Firebase
const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export { db, googleAuthProvider };
