/**
 * @jest-environment node
 */

import { deleteDoc, doc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddNewNote, startLoadNotes } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {
		uid: 'TESTING',
	},
};

let store = mockStore(initState);

describe('Pruebas en action notes.js', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('should crear una nueva nota startAddNewNote', async () => {
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
});
