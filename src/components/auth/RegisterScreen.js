import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { removeError, SetError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export default function RegisterScreen() {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);

	const [{ name, email, password, password2 }, handleInputValues] = useForm({
		name: 'Yajaira',
		email: 'yayita@gmail.com',
		password: '123456',
		password2: '123456',
	});

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	const isFormValid = () => {
		let valid = true;

		if (name.trim().length === 0) {
			dispatch(SetError('Name is required'));
			valid = false;
		} else if (!validator.isEmail(email)) {
			dispatch(SetError('Invalid email '));
			valid = false;
		} else if (password !== password2 || password.trim().length < 5) {
			dispatch(SetError('Password should be at least 6 characters'));
			valid = false;
		}

		valid && dispatch(removeError());

		return valid;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form
				className="animate__animated animate__fadeIn animate__faster"
				onSubmit={handleRegister}
			>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<input
					type="text"
					placeholder="Name"
					name="name"
					className="auth__input"
					autoComplete="off"
					value={name}
					onChange={handleInputValues}
				/>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputValues}
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputValues}
				/>
				<input
					type="password"
					placeholder="Password Confirmation"
					name="password2"
					className="auth__input"
					value={password2}
					onChange={handleInputValues}
				/>
				<button type="submit" className="btn btn-primary btn-block mb-5">
					Register
				</button>
				<Link to="/auth/login" className="link">
					Alredy have an account?
				</Link>
			</form>
		</>
	);
}
