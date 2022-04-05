import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { startLogout } from '../../../actions/auth';
import { startAddNewNote } from '../../../actions/notes';
import SideBar from '../../../components/journal/SideBar';

jest.mock('../../../actions/auth', () => ({
	startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
	startAddNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
	auth: {
		uid: '123',
		name: 'Enrique',
	},
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

const wrapper = mount(
	<Provider store={store}>
		<SideBar />
	</Provider>
);

describe('Pruebas en <SideBar />', () => {
	test('Debe renderizart correctamente <SideBar/>', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe llamar al logout', () => {
		wrapper.find('button').prop('onClick')();
		expect(startLogout).toHaveBeenCalled();
	});

	test('Debe llamar al journal__new-entry', () => {
		wrapper.find('.journal__new-entry').prop('onClick')();
		expect(startAddNewNote).toHaveBeenCalled();
	});
});
