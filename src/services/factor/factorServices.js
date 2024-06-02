import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdFactorServices = async ({ factNombre, tifaId }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/factor', { factNombre, tifaId });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los tipo factor
const getAllFactorTypesServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/factor_type');
		return data;
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los factor
const getAllFactorServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/factor');
		return data;
	} catch (error) {
		console.log(error);
	}
};



const updateFactorServices = async (factId, { factNombre, tifaId }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/factor/${factId}`, { factNombre, tifaId });
		return data;
	} catch (error) {
		console.log(error);
	}
};

// TODO: Crear un servicio para eliminar un programa académico
const deleteFactorServices = async (factId) => {
	try {
		const { data } = await planDeMejoramientoApi.delete(`/factor/${factId}`);
		console.log(data)
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { createdFactorServices, getAllFactorTypesServices, updateFactorServices, deleteFactorServices, getAllFactorServices };
