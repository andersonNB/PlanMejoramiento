import {
	createdStrategicAxisServices,
	getAllStrategicAxisServices,
	updateStrategicAxisServices
} from '../../../services/strategicAxis/strategicAxisServices.js';
import { setStrategicAxes, createdStrategicAxis, updateStrategicID } from './strategicAxisSlice.js';

export const tGetAllStrategicAxes = () => async (dispatch) => {
	try {
		const data = await getAllStrategicAxisServices();
		// console.log({data})
		dispatch(setStrategicAxes(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateStrategicAxis = ({ ejesNombre }, objAcademicProgram) => async (dispatch) => {
	try {
		await createdStrategicAxisServices({ ejesNombre });
		dispatch(createdStrategicAxis(objAcademicProgram));
	} catch (error) {
		console.log(error);
	}

};


export const tUpdateStrategicAxis = (ejesId, { ejesNombre }, index) => async (dispatch) => {
	try {
		const data = await updateStrategicAxisServices(ejesId, { ejesNombre });
		console.log(data);
		dispatch(updateStrategicID({ data, index }));
	} catch (error) {
		console.log(error);
	}
};

