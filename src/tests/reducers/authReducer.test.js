import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas sobre authReducer.js', () => {
	test('Debe realizar login', () => {
		const initState = {};
		const action = {
			type: types.login,
			payload: {
				uid: 'ABC123',
				displayName: 'Enrique',
			},
		};

		const state = authReducer(initState, action);

		expect(state.uid).toBe(action.payload.uid);
		expect(state.name).toBe(action.payload.displayName);
	});

	test('Debe realizar logout', () => {
		const initState = {
			uid: 'ABC123',
			name: 'Enrique',
		};
		const action = {
			type: types.logout,
		};

		const state = authReducer(initState, action);

		expect(state).toEqual({});
	});

	test('Debe devolver el mismo estado', () => {
		const initState = {
			uid: 'ABC123',
			name: 'Enrique',
		};
		const action = {
			type: 'sigin',
		};

		const state = authReducer(initState, action);

		expect(state).toEqual(initState);
	});
});
