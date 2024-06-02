import { useReducer } from 'react'
import { authReducer } from './authReducer'
import AuthContext from './AuthContext';

const initialState = {
	logged: false,
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
	};
};

const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer,initialState,init)

	console.log({authState})
    const login = async (user)=>{
       
        const action = {
			types:'login',
			payload: user,
		};

		localStorage.setItem('user', JSON.stringify(user));

		dispatch(action);

    };

    const logout = () => {
		const action = {
			types: 'logout',
			payload: null,
		};

		//con el clear limpia toda la info guardada y con el removeItem, solo el que le
		//especifiquemos
		localStorage.removeItem('user');

		dispatch(action);
	};


    return (
        <AuthContext.Provider value={{...authState, login: login, logout: logout}} >
            {children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;