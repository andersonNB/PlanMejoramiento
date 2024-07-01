import { createdTypeSituationServices, getAllTypeSituationServices } from '../../../services/TypeSituation/TypeSituationServices';
import { createdTypeSituation, setAllTypeSituation } from './typeSituationSlice';

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
