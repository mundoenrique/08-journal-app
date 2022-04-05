import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import JournalEntry from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
	id: '123',
	title: 'Note title',
	body: 'Note body',
	date: 5646546546132131,
	url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
};

const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...note} />
	</Provider>
);

describe('Pruebas en <JournalEntry />', () => {
	test('Debe renderizar correctament <JournalEntry />', () => {
		expect(wrapper).toMatchSnapshot();
	});

	test('Debe llamar al activenote', () => {
		wrapper.find('.journal__entry').prop('onClick')();

		expect(store.dispatch).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledWith(
			activeNote(note.id, { ...note })
		);
	});
});
