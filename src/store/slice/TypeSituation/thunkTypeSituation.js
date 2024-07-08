import { createdTypeSituationServices, getAllTypeSituationServices, updateTypeSituationServicesbyID } from '../../../services/TypeSituation/TypeSituationServices';
import { createdTypeSituation, setAllTypeSituation, updateTypeSituationID } from './typeSituationSlice';

export const tCreateTypeSituation =
	({ tisiNombre }) =>
	async (dispatch) => {
		try {
			await createdTypeSituationServices({ tisiNombre });
			dispatch(createdTypeSituation({ tisiNombre }));
		} catch (error) {
			console.log(error);
		}
	};

export const tGetAllTypeSituation = () => async (dispatch) => {
	try {
		const res = await getAllTypeSituationServices();
		dispatch(setAllTypeSituation(res));
	} catch (error) {
		console.log(error);
	}
};

export const tUpdateTypeSituationID = ({ id, tisiNombre }) => async (dispatch) => {
	try {
		const res = await updateTypeSituationServicesbyID({ id, tisiNombre });
		dispatch(updateTypeSituationID(res));		
	} catch (error) {
		console.log(error)		
	}
};
