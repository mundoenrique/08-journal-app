import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import AuthRouter from './AuthRouter';
import JournalScree from '../components/journal/JournalScree';

export default function AppRouter() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path="/auth" component={AuthRouter} />
					<Route exact path="/" component={JournalScree} />
					<Redirect to="/auth/login" />
				</Switch>
			</div>
		</Router>
	);
}
