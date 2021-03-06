/**
 * @jest-environment node
 */
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	startAddNewNote,
	startLoadNotes,
	startSaveNote,
	startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
	fileUpload: () => Promise.resolve('https://image.jpg'),
}));

global.scrollTo = jest.fn();
global.File = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {
		uid: 'TESTING',
	},
	notes: {
		active: {
			id: '3wgVMxZYFYNfbmdeinh4',
			title: 'Hola',
			body: 'Mundo',
			date: 1648856254869,
		},
	},
};

let store = mockStore(initState);

describe('Pruebas en action notes.js', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('Debe crear una nueva nota startAddNewNote', async () => {
		await store.dispatch(startAddNewNote());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
			},
		});

		expect(actions[1]).toEqual({
			type: types.notesAddNew,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				date: expect.any(Number),
			},
		});

		await deleteDoc(
			doc(db, 'TESTING', 'journal', 'notes', actions[1].payload.id)
		);
	});

	test('Debe cargar las notas startLoadNotes', async () => {
		await store.dispatch(startLoadNotes());

		const actions = store.getActions();
		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		};

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array),
		});

		expect(actions[0].payload.length).toBe(2);
		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test('Debe actulizar la nota startSaveNote', async () => {
		const note = {
			id: 'PwZROm0ijXEZdtlCXhVL',
			title: 'title',
			body: 'body',
			date: 1648856254565,
		};

		await store.dispatch(startSaveNote(note));

		const actions = store.getActions();
		const docRef = doc(db, 'TESTING', 'journal', 'notes', note.id);
		const docSnap = await getDoc(docRef);

		expect(actions[0].type).toBe(types.notesUpdated);
		expect(docSnap.data().title).toBe(note.title);
	});

	test('Debe actualizar el url de la note startUploading', async () => {
		const { id } = initState.notes.active;
		const file = new File([], 'chucknorris.png');

		await store.dispatch(startUploading(file));

		const docRef = doc(db, 'TESTING', 'journal', 'notes', id);
		const docSnap = await getDoc(docRef);

		expect(docSnap.data().url).toBe('https://image.jpg');
	});
});
