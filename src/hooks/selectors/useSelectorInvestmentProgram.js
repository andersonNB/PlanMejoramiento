import { useDispatch, useSelector } from 'react-redux';
import { tCreatedInvestmentProgramServices, tGetAllInvestmentProgramServices } from '../../store/slice/InvestmentProgram/thunkInvestmentProgram';


const useSelectorInvestmentProgram = () => {

    const dispatch = useDispatch();
    const { investmentPrograms } = useSelector((state) => state.INVESTMENT_PROGRAM);


    const getAllInvestmentProgram = () => {
		dispatch(tGetAllInvestmentProgramServices());
	};

    const createdInvestmentProgram = ({ prinNombre, liesId, ejesId }) => {
        dispatch(tCreatedInvestmentProgramServices({ prinNombre, liesId, ejesId }));
    };


    return {
        investmentPrograms,
        //functions
        getAllInvestmentProgram,
        createdInvestmentProgram
    }

}

export default useSelectorInvestmentProgram;