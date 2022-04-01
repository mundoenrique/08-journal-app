import { useSelector } from 'react-redux';

import SideBar from './SideBar';
import NothingSelected from './NothingSelected';
import NoteScreen from '../notes/NoteScreen';

export default function JournalScreen() {
	const { active } = useSelector((state) => state.notes);
	return (
		<div className="journal__main-content">
			<SideBar />
			<main>{active ? <NoteScreen /> : <NothingSelected />}</main>
		</div>
	);
}
