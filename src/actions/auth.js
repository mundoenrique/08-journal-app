import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';

import { googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				console.log(user);
				dispatch(login(user.uid, user.displayName));
				dispatch(finishLoading());
			})
			.catch((error) => {
				console.log(typeof error);
				console.log(error);
				console.log(error.code);
				console.log(error.message);
				dispatch(finishLoading());
			});
	};
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: name });
				console.log(user);
				dispatch(login(user.uid, user.displayName));
			})
			.catch((error) => {
				console.log(typeof error);
				console.log(error);
				console.log(error.code);
				console.log(error.message);
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		const auth = getAuth();
		signInWithPopup(auth, googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			})
			.catch((error) => {
				console.log(error);
			});
	};
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});
