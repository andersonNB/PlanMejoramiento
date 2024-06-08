import {
	createdFactorServices,
	getAllFactorTypesServices,
	updateFactorServices,
	getAllFactorServices
} from '../../../services/factor/factorServices.js';
import { createdFactor, setFactors, setFactorTypes, updateFactorID } from './factorSlice.js';

export const tGetAllFactorTypes = () => async (dispatch) => {
	try {
		const data = await getAllFactorTypesServices();
		// console.log({data})
		dispatch(setFactorTypes(data));
	} catch (error) {
		console.log(error);
	}
};

export const tGetAllFactor = () => async (dispatch) => {
	try {
		const data = await getAllFactorServices();
		// console.log({data})
		dispatch(setFactors(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateFactor = ({ factNombre, tifaId }, objAcademicProgram) => async (dispatch) => {
	try {
		await createdFactorServices({ factNombre, tifaId });
		dispatch(createdFactor(objAcademicProgram));
	} catch (error) {
		console.log(error);
	}

};


export const tUpdateFactor = (factId, { factNombre, tifaId }, index) => async (dispatch) => {
	try {
		const data = await updateFactorServices(pracId, { factNombre, tifaId });
		console.log(data);
		dispatch(updateFactorID({ data, index }));
	} catch (error) {
		console.log(error);
	}
};

