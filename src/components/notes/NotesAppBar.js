import { useDispatch, useSelector } from 'react-redux';

import { startSaveNote, startUploading } from '../../actions/notes';

export default function NotesAppBar() {
	const dispatch = useDispatch();
	const { active: note } = useSelector((state) => state.notes);

	const handlesave = () => {
		dispatch(startSaveNote(note));
	};

	const handlePictureclick = () => {
		const fileInput = document.getElementById('fileSelector');
		fileInput.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			dispatch(startUploading(file));
		}
	};

	return (
		<>
			<div className="notes__appbar">
				<span>28 de Agosto 2020</span>
				<input
					id="fileSelector"
					type="file"
					name="file"
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
				<div>
					<button className="btn" onClick={handlePictureclick}>
						Picture
					</button>
					<button className="btn" onClick={handlesave}>
						Save
					</button>
				</div>
			</div>
		</>
	);
}
