import Swal from 'sweetalert2';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	setDoc,
} from 'firebase/firestore';

import { db } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { fileUpload } from '../helpers/fileUpload';

export const startAddNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const docRef = await addDoc(
			collection(db, uid, 'journal', 'notes'),
			newNote
		);

		dispatch(activeNote(docRef.id, newNote));
		dispatch(addNewNote(docRef.id, newNote));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

export const addNewNote = (id, note) => ({
	type: types.notesAddNew,
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

export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!note.url) {
			delete note.url;
		}

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		await setDoc(doc(db, uid, 'journal', 'notes', note.id), noteToFirestore);

		dispatch(refreshNote(note.id, noteToFirestore));
		Swal.fire('Saved!', note.title, 'success');
	};
};

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: { id, note: { id, ...note } },
});

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: note } = getState().notes;

		Swal.fire({
			title: 'Uploading...',
			html: 'Please wait...',
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		const fileUrl = await fileUpload(file);
		note.url = fileUrl;

		dispatch(startSaveNote(note));

		Swal.close();
	};
};

export const startDeleteNote = (id) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		await deleteDoc(doc(db, uid, 'journal', 'notes', id));

		dispatch(deleteNote(id));
	};
};

export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: id,
});

export const noteLogout = () => ({
	type: types.notesLogoutCleaning,
});
