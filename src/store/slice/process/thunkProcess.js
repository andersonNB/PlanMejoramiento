import {
	createdProcessServices,
	getAllProcessServices,
	updateProcessServices
} from '../../../services/process/processServices.js';
import { setProcesses, updateProcessID, createdProcess } from './processSlice.js';

export const tGetAllprocesses = () => async (dispatch) => {
	try {
		const data = await getAllProcessServices();
		// console.log({data})
		dispatch(setProcesses(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateProcess = ({ procNombre }, objProcess) => async (dispatch) => {
	try {
		await createdProcessServices({ procNombre });
		dispatch(createdProcess(objProcess));
	} catch (error) {
		console.log(error);
	}

};


export const tUpdateProcess = (procId, { procNombre }, index) => async (dispatch) => {
	try {
		const data = await updateProcessServices(procId, { procNombre });
		console.log(data);
		dispatch(updateProcessID({ data, index }));
	} catch (error) {
		console.log(error);
	}
};

