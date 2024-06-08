import { createdInvestmentProgramServices, getAllInvestmentProgramServices } from '../../../services/InvestmentProgram/InvestmentProgramServices';
import { createdInvestmentProgram, setInvestmentPrograms } from './InvestmentProgramSlice';



export const tGetAllInvestmentProgramServices = () => async (dispatch) => {
	try {
		const data = await getAllInvestmentProgramServices();
		// console.log({data})
		dispatch(setInvestmentPrograms(data));
	} catch (error) {
		console.log(error);
	}
};


export const tCreatedInvestmentProgramServices = ({ prinNombre, liesId, ejesId }) => async (dispatch) => {
    try {
        const data = await createdInvestmentProgramServices({ prinNombre, liesId });
        dispatch(createdInvestmentProgram(data))
    } catch (error) {
        console.log(error)
    }
}