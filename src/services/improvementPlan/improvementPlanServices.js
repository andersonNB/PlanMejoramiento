import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdImprovementPlanServices = async ({ plmeNombre, pracId }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/improvement-plan', { plmeNombre, pracId });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los planes
const getImprovementPlanByPracIdServices = async (pracId) => {
	try {
		const { data } = await planDeMejoramientoApi.get(`/improvement-plan/academic-program/${pracId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const getAllImprovementPlanServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/improvement-plan');
		return data;
	} catch (error) {
		console.log(error);
	}
};

const updateImprovementPlanServices = async (plmeId, { plmeNombre, pracId }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/improvement-plan/${plmeId}`, { plmeNombre, pracId });
		return data;
	} catch (error) {
		console.log(error);
	}
};


export {
	createdImprovementPlanServices,
	getAllImprovementPlanServices,
	updateImprovementPlanServices,
	getImprovementPlanByPracIdServices
};
