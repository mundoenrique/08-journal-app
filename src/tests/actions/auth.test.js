/**
 * @jest-environment node
 */
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { types } from '../../types/types';
import {
	login,
	logout,
	startLoginEmailPassword,
	startLogout,
} from '../../actions/auth';

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

describe('Pruebas en el auth.js', () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test('login y logout deben crear la acción respectiva', () => {
		const uid = '123';
		const displayName = 'Juan';
		const loginAction = login(uid, displayName);
		const logoutAction = logout();

		expect(loginAction).toEqual({
			type: types.login,
			payload: {
				uid,
				displayName,
			},
		});
		expect(logoutAction).toEqual({
			type: types.logout,
		});
	});

	test('Debe realizar la acción de startLogout', async () => {
		await store.dispatch(startLogout());
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.logout,
		});

		expect(actions[1]).toEqual({
			type: types.notesLogoutCleaning,
		});
	});

	test('Debe realizar la acción de startLoginEmailPassword', async () => {
		await store.dispatch(startLoginEmailPassword('test@testing.com', '123456'));
		const actions = store.getActions();

		expect(actions[1]).toEqual({
			type: types.login,
			payload: {
				uid: expect.any(String),
				displayName: null,
			},
		});
	});
});
