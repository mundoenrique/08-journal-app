import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [inputValues, setInputValues] = useState(initialState);

	const resetValues = () => {
		setInputValues(initialState);
	};

	const handleInputValues = ({ target }) => {
		setInputValues({
			...inputValues,
			[target.name]: target.value,
		});
	};

	return [inputValues, handleInputValues, resetValues];
};
