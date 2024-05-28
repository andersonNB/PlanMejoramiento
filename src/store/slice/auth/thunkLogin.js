import { singIn } from '../../../services/login/loginServices';

export const tSignIn = ({token, tiusId,pracId}) => async (dispatch) => {
	try {
		const res =  await singIn({token, tiusId,pracId});
		console.log(res)

		// await saveLocalStorage(
		// 	data.access_token,
		// 	data.expires_on,
		// 	data.user_info.name,
		// 	data.user_info.roleId,
		// 	JSON.stringify(data.user_info),
		// 	data.user_info.email,
		// 	data.user_info.idUser,
		// 	JSON.stringify(data.menu)
		// );

		// await Promise.all([
		// 	dispatch(getHomeData()),
		// 	dispatch(tGetPreviousState()),
		// 	dispatch(setUserInfo(data.user_info)),
		// 	dispatch(setIsLogin(true)),
		// ]);
	} catch (e) {
		// dispatch(setIsLogin(false));
		// if (e.status === 404) return dispatch(setUserNoExistModal(true));
		// ERROR_MODAL(e?.data?.msg || e?.msg || e?.data?.message || e?.message || 'Algo salio mal al autenticar el usuario');
	}
};