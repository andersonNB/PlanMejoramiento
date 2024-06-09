import { useReducer } from 'react';
import { authReducer } from './authReducer';
import AuthContext from './AuthContext';

const initialState = {
	logged: false,
	user: null,
	isAdmin:null,
};

const init = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	console.log('AuthProvider user', user);
	//Como el localStorage guardar y retornar string debemos
	// en este caso convertirlo a un objeto para que sea
	// aceptado en nuestro estado inicial

	return {
		logged: !!user,
		user: user,
		isAdmin:JSON.parse(localStorage.getItem('isAdmin')),
	};
};

const AuthProvider = ({ children }) => {

	const [authState, dispatch] = useReducer(authReducer, initialState, init);

	console.log({ authState });
	const login = async ({infoUser, isAdmin}) => {
		console.log(infoUser, isAdmin)

		const action = {
			types: 'login',
			payload: infoUser,
			isAdmin
		};

		localStorage.setItem('user', JSON.stringify(infoUser));
		localStorage.setItem('isAdmin', JSON.stringify(isAdmin));

		dispatch(action);

	};

	const logout = () => {
		const action = {
			types: 'logout',
			payload: null
		};

		//con el clear limpia toda la info guardada y con el removeItem, solo el que le
		//especifiquemos
		localStorage.clear();

		dispatch(action);
	};


	return (
		<AuthContext.Provider value={{ ...authState, login: login, logout: logout }}>
			{children}
		</AuthContext.Provider>
	);

};

export default AuthProvider;