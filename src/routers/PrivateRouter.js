import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRouter({
	isLoggedIn,
	component: Component,
	...rest
}) {
	return (
		<Route
			{...rest}
			component={(props) =>
				isLoggedIn ? <Component {...props} /> : <Redirect to="/auth/login" />
			}
		/>
	);
}

PrivateRouter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
