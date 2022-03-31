import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import AuthRouter from './AuthRouter';
import JournalScreen from '../components/journal/JournalScreen';
import { login } from '../actions/auth';

export default function AppRouter() {
	const dispatch = useDispatch();
	const [checking, setChecking] = useState(true);
	const [isLoggedIn, setisLoggedIn] = useState(false);

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(login(user.uid, user.displayName));
				setisLoggedIn(true);
			} else {
				setisLoggedIn(false);
			}
		});

		setChecking(false);
	}, [dispatch, setChecking, setisLoggedIn]);

	if (checking) {
		return <h1>Espera por favor...</h1>;
	}

	return (
		<Router>
			<div>
				<Switch>
					<Route path="/auth" component={AuthRouter} />
					<Route exact path="/" component={JournalScreen} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
}
