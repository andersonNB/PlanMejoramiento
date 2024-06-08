import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdStrategicAxisServices = async ({ ejesNombre }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/strategic-axis', { ejesNombre });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los ejes
const getAllStrategicAxisServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/strategic-axis');
		return data;
	} catch (error) {
		console.log(error);
	}
};


const updateStrategicAxisServices = async (ejesId, { ejesNombre }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/strategic_axis/${ejesId}`, { ejesNombre });
		return data;
	} catch (error) {
		console.log(error);
	}
};


export { createdStrategicAxisServices, getAllStrategicAxisServices, updateStrategicAxisServices };
