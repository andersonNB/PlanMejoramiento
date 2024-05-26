import planDeMejoramientoApi from '../wrappers/programAcademicWrapper';

//Conseguir programa academico por ID
const getAcademicProgramID = async ({ pracNombre, pracCodigo }) => {
	// dispatch(onChecking());
	//TODO:Creación de thunks
	try {
		const { data } = await planDeMejoramientoApi.post('/academic_program', { pracNombre, pracCodigo });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};

//Conseguir todos los programas academicos
const getAllAcademicProgram = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/academic_program');
		return data;
	} catch (error) {
		console.log(error);
	}
};

const updateAcademicProgram = async (pracId, { pracNombre, pracCodigo }) => {
	try {
		const { data } = await planDeMejoramientoApi.put(`/academic_program/${pracId}`, { pracNombre, pracCodigo });
		return data;
	} catch (error) {
		console.log(error);
	}
};

export { getAcademicProgramID, getAllAcademicProgram, updateAcademicProgram };
