import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote } from '../../actions/notes';

export default function NotesAppBar() {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);

	const handlesave = () => {
		dispatch(startSaveNote(note));
	};

	return (
		<>
			<div className="notes__appbar">
				<span>28 de Agosto 2020</span>
				<div>
					<button className="btn">Picture</button>
					<button className="btn" onClick={handlesave}>
						Save
					</button>
				</div>
			</div>
		</>
	);
}
