import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import AppRouter from '../../routers/AppRouter';
import { act } from '@testing-library/react';
import { login } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
	login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null,
	},
	notes: {
		notes: [],
		active: null,
	},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter/>', () => {
	test('Debe llamar al login si estoy', async () => {
		await act(async () => {
			const auth = getAuth();
			await signInWithEmailAndPassword(auth, 'test@testing.com', '123456');

			mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(login).toHaveBeenCalled();
		expect(login).toHaveBeenCalledWith('oVUc0aOcRQUoxP8lqN3XLWmQu6A3', null);
	});
});
