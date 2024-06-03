import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdProcessServices = async ({ procNombre }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/process', { procNombre });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los ejes
const getAllProcessServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/process');
		return data;
	} catch (error) {
		console.log(error);
	}
};


const updateProcessServices = async (procId, { procNombre }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/process/${procId}`, { procNombre });
		return data;
	} catch (error) {
		console.log(error);
	}
};


export { createdProcessServices, getAllProcessServices, updateProcessServices };
