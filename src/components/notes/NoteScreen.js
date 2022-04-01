import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NotesAppBar from './NotesAppBar';
import { activeNote, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';

export default function NoteScreen() {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);
	const [inputValues, handleInputValues, resetValues] = useForm(note);
	const { title, body, id } = inputValues;
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

	const handleDelete = () => {
		dispatch(startDeleteNote(id));
	};

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
						placeholder="What happened today"
						className="notes__textarea"
						name="body"
						value={body}
						onChange={handleInputValues}
					></textarea>
					{note.url && (
						<div className="notes__image">
							<img src={note.url} alt={title} />
						</div>
					)}
				</div>
				<button className="btn btn-danger" onClick={handleDelete}>
					Delete
				</button>
			</div>
		</>
	);
}
