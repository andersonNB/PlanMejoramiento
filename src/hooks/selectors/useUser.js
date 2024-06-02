import { useDispatch } from 'react-redux';
import { tUserType } from '../../store/slice/user/thunkUser';

const useUser = () => {

	const dispatch = useDispatch();

	const getUserType = async () => {
		const res = await dispatch(tUserType());
		// console.log(res);
		return res;
	};

	return {
		getUserType,
	};
};

export default useUser;
