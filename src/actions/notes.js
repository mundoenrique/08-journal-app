import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { types } from '../types/types';

export const startAddNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newNote = {
			title: 'mundoenrique',
			body: 'Enrique Peñaloza',
			date: new Date().getTime(),
		};

		const docRef = await addDoc(
			collection(db, `${uid}/journal/notes`),
			newNote
		);

		dispatch(activeNote(docRef.id, newNote));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

export const startLoadNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const notes = [];
		const querySnapshot = await getDocs(collection(db, `${uid}/journal/notes`));

		querySnapshot.forEach((doc) => {
			notes.push({
				id: doc.id,
				...doc.data(),
			});
		});

		dispatch(setNotes(notes));
	};
};

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});
