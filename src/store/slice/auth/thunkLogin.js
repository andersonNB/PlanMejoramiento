import { CustomModal } from '../../../components/Modal/CustomModal';
import { singIn, singInAdmin } from '../../../services/login/loginServices';
import { setIsAdmin } from './loginSlice';

export const tSignIn = ({ token, tiusId, pracId ,isAdminParam}) => async (dispatch) => {
	try {
		const res = await singIn({ token, tiusId, pracId });
		console.log(res);
		const serializer = {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		};

		localStorage.setItem('token', res.token);
		localStorage.setItem('user', serializer.serialize(res.usuario));


		dispatch(setIsAdmin(isAdminParam));
		return res;
		
	} catch (e) {
		// dispatch(setIsLogin(false));
		if (e.error === 400) return alert('Usuario o contraseña incorrectos');
	}
};

export const tSignInAdmin = ({ usuario, password }) => async (dispatch) => {
	try {
		const res = await singInAdmin({ usuario, password });
		localStorage.setItem('token', res.token);
		console.log(res)
		dispatch(setIsAdmin(true));
		return res;
	} catch (error) {
		console.log(error);		
	}

}