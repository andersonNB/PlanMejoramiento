import { useDispatch } from 'react-redux';
import { tCreatedInvestmentProgramServices, tGetAllInvestmentProgramServices } from '../../store/slice/InvestmentProgram/thunkInvestmentProgram';


const useSelectorInvestmentProgram = () => {

    const dispatch = useDispatch();

    const getAllInvestmentProgram = () => {
		dispatch(tGetAllInvestmentProgramServices());
	};

    const createdInvestmentProgram = ({ prinNombre, liesId, ejesId }) => {
        dispatch(tCreatedInvestmentProgramServices({ prinNombre, liesId, ejesId }));
    };


    return {
        //functions
        getAllInvestmentProgram,
        createdInvestmentProgram
    }

}

export default useSelectorInvestmentProgram;