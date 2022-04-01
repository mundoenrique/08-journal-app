import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NotesAppBar from './NotesAppBar';

export default function NoteScreen() {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);
	const [inputValues, handleInputValues, resetValues] = useForm(note);
	const { title, body } = inputValues;
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
		dispatch();
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
						placeholder="What happen today"
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
