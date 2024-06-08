import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

//Conseguir programa academico por ID
const createdAcademicProgramServices = async ({ pracNombre, pracCodigo }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/academic-program', { pracNombre, pracCodigo });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los programas academicos
const getAllAcademicProgramServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/academic-program');
		return data;
	} catch (error) {
		console.log(error);
	}
};

const updateAcademicProgramServices = async (pracId, { pracNombre, pracCodigo }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/academic-program/${pracId}`, { pracNombre, pracCodigo });
		return data;
	} catch (error) {
		console.log(error);
	}
};

// TODO: Crear un servicio para eliminar un programa académico
const deleteAcademicProgramServices = async (pracId) => {
	try {
		const { data } = await planDeMejoramientoApi.delete(`/academic-program/${pracId}`);
		console.log(data)
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { createdAcademicProgramServices, getAllAcademicProgramServices, updateAcademicProgramServices, deleteAcademicProgramServices };
