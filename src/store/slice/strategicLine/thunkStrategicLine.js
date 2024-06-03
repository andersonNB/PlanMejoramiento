import {
	createdStrategicLineServices,
	getAllStrategicLinesServices,
	updateStrategicLineServices
} from '../../../services/strategicLine/strategicLineServices.js';
import { setStrategicLines, createdStrategicLine, updateStrategicLineID } from './strategicLineSlice.js';

export const tGetAllStrategicLines = () => async (dispatch) => {
	try {
		const data = await getAllStrategicLinesServices();
		dispatch(setStrategicLines(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateStrategicLine = ({ liesNombre, liesObjetivos, ejesId }, objStrategicLine) => async (dispatch) => {
	try {
		await createdStrategicLineServices({ liesNombre, liesObjetivos, ejesId });
		dispatch(createdStrategicLine(objStrategicLine));
	} catch (error) {
		console.log(error);
	}

};


export const tUpdateStrategicLine = (liesId, { liesNombre, liesObjetivos, ejesId }, index) => async (dispatch) => {
	try {
		const data = await updateStrategicLineServices(liesId, { liesNombre, liesObjetivos, ejesId });
		dispatch(updateStrategicLineID({ data, index }));
	} catch (error) {
		console.log(error);
	}
};

