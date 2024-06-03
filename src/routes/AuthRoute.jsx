import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const AuthRoute = ({ element: Component, ...rest }) => {
	const { logged } = useContext(AuthContext);
	return logged ? (
		<Navigate to="/dashboard" replace={true} />
	) : (
		<Component {...rest} />
	);
};

export default AuthRoute;
