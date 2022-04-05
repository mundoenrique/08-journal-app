import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { activeNote } from '../../../actions/notes';
import NoteScreen from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
	activeNote: jest.fn(),
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
		active: {
			id: '123',
			title: 'Note title',
			body: 'Note body',
			date: 5646546546132131,
		},
	},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<NoteScreen />
	</Provider>
);

describe('Pruebas sobre <NoteScreen />', () => {
	test('should Debe renderizar correctament <NoteScreen />', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('should Debe llamar al activenote', () => {
		wrapper.find('input[name="title"]').simulate('change', {
			target: {
				name: 'title',
				value: 'Note title2',
			},
		});

		expect(activeNote).toHaveBeenCalled();
		expect(activeNote).toHaveBeenLastCalledWith('123', {
			id: '123',
			title: 'Note title2',
			body: 'Note body',
			date: 5646546546132131,
		});
	});
});
