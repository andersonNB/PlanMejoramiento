import { useDispatch } from 'react-redux';
import { tSignIn } from '../../store/slice/auth/thunkLogin';


const useSelectorLogin = () => {
    const dispatch = useDispatch();


    const signIn = ({token, tiusId,pracId}) => {
        // console.log({token, tiusId,pracId})
		dispatch(tSignIn({token, tiusId,pracId}));
	};


    return {
		//STATE
		//FUNCTIONS
		signIn
	};
};

export default useSelectorLogin;