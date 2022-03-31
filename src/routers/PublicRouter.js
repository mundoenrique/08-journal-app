import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PublicRouter({
	isLoggedIn,
	component: Component,
	...rest
}) {
	return (
		<Route
			{...rest}
			component={(props) =>
				isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
}

PublicRouter.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
	component: PropTypes.func.isRequired,
};
