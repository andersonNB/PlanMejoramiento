import { userType } from '../../../services/user/userServices';

export const tUserType = () => async (dispatch) => {
	try {
		const res = await userType();
		return res;
	} catch (error) {
		console.error(error);
	}
};
