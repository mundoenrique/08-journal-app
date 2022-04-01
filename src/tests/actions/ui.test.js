import {
	finishLoading,
	removeError,
	setError,
	startLoading,
} from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui.js', () => {
	test('Todas las acciones deben crearse', () => {
		const ErrorMsg = 'Ocurrio un error';
		const setErrorAction = setError(ErrorMsg);
		const removeErrorAction = removeError();
		const startLoadingAction = startLoading();
		const finishLoadingAction = finishLoading();

		expect(setErrorAction).toEqual({
			type: types.uiSetError,
			payload: ErrorMsg,
		});

		expect(removeErrorAction).toEqual({
			type: types.uiRemoveError,
		});

		expect(startLoadingAction).toEqual({
			type: types.uiStartLoading,
		});

		expect(finishLoadingAction).toEqual({
			type: types.uiFinishLoading,
		});
	});
});
