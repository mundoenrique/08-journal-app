import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export default function LoginScreen() {
	const dispatch = useDispatch();
	const [{ email, password }, handleInputValues] = useForm({
		email: 'enrique@yahoo.com',
		password: '123456',
	});

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(login(123456, 'Enrique'));
	};

	return (
		<>
			<h3 className="auth__title">Login</h3>
			<form onSubmit={handleLogin}>
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
				<button type="submit" className="btn btn-primary btn-block">
					Login
				</button>
				<div className="auth__social-network">
					<p>Login with social network</p>
					<div className="google-btn">
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Sign in with google</b>
						</p>
					</div>
				</div>
				<Link to="/auth/register" className="link">
					Create new account
				</Link>
			</form>
		</>
	);
}
