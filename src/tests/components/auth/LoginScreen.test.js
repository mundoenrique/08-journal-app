import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import LoginScreen from '../../../components/auth/LoginScreen';
import {
	startGoogleLogin,
	startLoginEmailPassword,
} from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
	startGoogleLogin: jest.fn(),
	startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null,
	},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<LoginScreen />
		</MemoryRouter>
	</Provider>
);

describe('Pruebebas en <LoginScreen />', () => {
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	test('Debe renderizar el componente correctamente', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe llamar la acción startGoogleLogin', () => {
		wrapper.find('.google-btn').prop('onClick')();

		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test('Debe llamar la acción startLoginEmailPassword', () => {
		wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

		expect(startLoginEmailPassword).toHaveBeenCalledWith(
			'yayita@gmail.com',
			'123456'
		);
	});
});
