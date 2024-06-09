import { CustomModal } from '../../../components/Modal/CustomModal';
import { singIn, singInAdmin } from '../../../services/login/loginServices';

export const tSignIn = ({ token, tiusId, pracId }) => async (dispatch) => {
	try {
		const res = await singIn({ token, tiusId, pracId });
		console.log(res);
		const serializer = {
			serialize: JSON.stringify,
			deserialize: JSON.parse
		};

		localStorage.setItem('token', res.token);
		localStorage.setItem('user', serializer.serialize(res.usuario));
		return res;
		
	} catch (e) {
		// dispatch(setIsLogin(false));
		if (e.error === 400) return alert('Usuario o contraseña incorrectos');
	}
};

export const tSignInAdmin = ({ usuario, password }) => async (dispatch) => {
	try {
		const res = await singInAdmin({ usuario, password });
		
		console.log(res)
		return res;
	} catch (error) {
		console.log(error);		
	}

}