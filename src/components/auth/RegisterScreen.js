import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';

export default function RegisterScreen() {
	const [{ name, email, password, password2 }, handleInputValues] = useForm({
		name: 'Yajaira',
		email: 'yayita@gmail.com',
		password: '123456',
		password2: '123456',
	});

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			console.log(name, email, password, password2);
		}
	};

	const isFormValid = () => {
		let valid = true;

		if (name.trim().length === 0) {
			valid = false;
		} else if (!validator.isEmail(email)) {
			valid = false;
		} else if (password !== password2 || password.trim().length < 5) {
			valid = false;
		}

		return valid;
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form onSubmit={handleRegister}>
				<div className="auth__alert-error">Hola mundo</div>
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
