import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

export default function NoteScreen() {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);
	const [inputValues, handleInputValues, resetValues] = useForm(note);
	const { title, body, url } = inputValues;
	const activeId = useRef(note.id);

	useEffect(() => {
		if (note.id !== activeId.current) {
			resetValues(note);
			activeId.current = note.id;
		}
	}, [note, resetValues]);

	useEffect(() => {
		dispatch(activeNote(inputValues.id, { ...inputValues }));
	}, [dispatch, inputValues]);

	return (
		<>
			<div className="notes__main-content">
				<NotesAppBar />
				<div className="notes__content">
					<input
						type="text"
						placeholder="Some awesome title"
						className="notes__title-input"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputValues}
					/>
					<textarea
						placeholder="What happen today"
						className="notes__textarea"
						name="body"
						value={body}
						onChange={handleInputValues}
					></textarea>
					{url && (
						<div className="notes__image">
							<img
								src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
								alt="place"
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
