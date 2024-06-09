import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
	const { logged, user, isAdmin } = useContext(AuthContext);
	const { pathname, search } = useLocation();

	// console.log({pathname, search})
	const lastPath = pathname + search;
	localStorage.setItem('lastPath', lastPath);

	return logged 
	? <Component {...rest} />
	 : <Navigate to={isAdmin ? '/login-admin' : '/login'} replace={true} />;
};

export default PrivateRoute;
