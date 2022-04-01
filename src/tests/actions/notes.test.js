import { deleteDoc, doc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
	auth: {
		uid: 'TESTING',
	},
});

describe('Pruebas en action notes.js', () => {
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
});
