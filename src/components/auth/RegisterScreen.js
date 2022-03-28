import { Link } from 'react-router-dom';
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
		console.log(name, email, password, password2);
	};

	return (
		<>
			<h3 className="auth__title">Register</h3>
			<form onSubmit={handleRegister}>
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
