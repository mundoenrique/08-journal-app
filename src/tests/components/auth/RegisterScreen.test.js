import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import RegisterScreen from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Pruebas sobre <RegisterScreen/>', () => {
	test('Debe de mostrar el componente <RegisterScreen/>', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe hacer el dispatch a la acción respectiva', () => {
		const inputEmail = wrapper.find('input[name="email"]');
		inputEmail.simulate('change', {
			target: {
				value: '',
				name: 'email',
			},
		});

		wrapper.find('form').simulate('submit', {
			preventDefault() {},
		});

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiSetError,
			payload: 'Invalid email',
		});
	});

	test('Debe de mostrar la caja de alerta con el error', () => {
		const initState = {
			auth: {},
			ui: {
				loading: false,
				msgError: 'Email is required',
			},
			notes: {
				notes: [],
				active: null,
			},
		};

		const store = mockStore(initState);

		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterScreen />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
		expect(wrapper.find('.auth__alert-error').text().trim()).toBe(
			'Email is required'
		);
	});
});
