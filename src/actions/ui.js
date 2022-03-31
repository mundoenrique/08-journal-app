import { types } from '../types/types';

export const SetError = (err) => ({
	type: types.uiSetError,
	payload: err,
});

export const removeError = () => ({
	type: types.uiRemoveError,
});
