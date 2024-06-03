import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdStrategicLineServices = async ({ liesNombre, liesObjetivos, ejesId }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/strategic_line', { liesNombre, liesObjetivos, ejesId });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los ejes
const getAllStrategicLinesServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/strategic_line');
		return data;
	} catch (error) {
		console.log(error);
	}
};


const updateStrategicLineServices = async (liesId, { liesNombre, liesObjetivos, ejesId }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/strategic_line/${liesId}`, {
			liesNombre,
			liesObjetivos,
			ejesId
		});
		return data;
	} catch (error) {
		console.log(error);
	}
};


export { createdStrategicLineServices, getAllStrategicLinesServices, updateStrategicLineServices };
