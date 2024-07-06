import {
	createdImprovementPlanServices,
	getAllImprovementPlanServices,
	getImprovementPlanByPracIdServices,
	updateImprovementPlanServices
} from '../../../services/improvementPlan/improvementPlanServices.js';
import {
	setImprovementPlans,
	createdImprovementPlan,
	updateImprovementPlanID,
	setImprovementPlan
} from './improvementPlanSlice.js';

export const tSetImprovementPlan = (plmeId, { plmeNombre, pracId }, index) => async (dispatch) => {

	try {
		dispatch(setImprovementPlan({ plmeId, plmeNombre, pracId }));
	} catch (error) {
		console.log(error);
	}
};

export const tGetAllImprovementPlan = () => async (dispatch) => {
	try {
		const data = await getAllImprovementPlanServices();
		// console.log({data})
		dispatch(setImprovementPlans(data));
	} catch (error) {
		console.log(error);
	}
};

export const tGetAllImprovementPlanByAcademicProgram = (pracId) => async (dispatch) => {
	try {
		const data = await getImprovementPlanByPracIdServices(pracId);
		// console.log({data})
		dispatch(setImprovementPlans(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateImprovementPlan = ({ plmeNombre, pracId }, objImprovementPlan) => async (dispatch) => {
	try {
		await createdImprovementPlanServices({ plmeNombre, pracId });
		dispatch(createdImprovementPlan({ plmeNombre, pracId }));
	} catch (error) {
		console.log(error);
	}

};


export const tUpdateImprovementPlan = (plmeId, { plmeNombre, pracId }, index) => async (dispatch) => {
	try {
		console.log({ plmeId, plmeNombre, pracId, index });
		const data = await updateImprovementPlanServices(plmeId, { plmeNombre, pracId });
		console.log(data);
		dispatch(updateImprovementPlanID({ data, index }));
	} catch (error) {
		console.log(error);
	}
};

