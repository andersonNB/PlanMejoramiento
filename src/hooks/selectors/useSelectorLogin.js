import { useDispatch } from 'react-redux';
import { tSignIn, tSignInAdmin } from '../../store/slice/auth/thunkLogin';

const useSelectorLogin = () => {
	const dispatch = useDispatch();

	const signIn = async ({ token, tiusId, pracId }) => {
		// console.log({token, tiusId,pracId})
		return dispatch(await tSignIn({ token, tiusId, pracId }));
	};

	const signInAdmin = async ({usuario,password}) => {
		return dispatch(await tSignInAdmin({usuario,password}));
	}

	return {
		//STATE
		//FUNCTIONS
		signIn,
		signInAdmin
	};
};

export default useSelectorLogin;
