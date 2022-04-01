import { fileUpload } from '../../helpers/fileUpload';

describe('Pruebas en fileUpload.js', () => {
	test('Debe cagar un archivo en firstore', async () => {
		const resp = await fetch(
			'https://www.online-image-editor.com/styles/2019/images/power_girl.png'
		);
		const blob = await resp.blob();

		const file = new File([blob], 'foto.png');

		const url = await fileUpload(file);

		expect(typeof url).toBe('string');
	});

	test('Debe retornar un error', async () => {
		const file = new File([], 'foto2.png');

		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
