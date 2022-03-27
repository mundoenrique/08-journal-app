import NotesAppBar from './NotesAppBar';

export default function NoteScreen() {
	return (
		<>
			<div className="notes__main-content">
				<NotesAppBar />
				<div className="notes__content">
					<input
						type="text"
						placeholder="Some awesome tile"
						className="notes__tilte-input"
						autoComplete="off"
					/>
					<textarea
						placeholder="What happen today"
						className="notes_textarea"
					></textarea>
					<div className="notes__image">
						<img
							src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80"
							alt="place"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
