import { createdAcademicProgramServices, deleteAcademicProgramServices, getAllAcademicProgramServices, updateAcademicProgramServices, } from '../../../services/programAcademic/programAcademicServices';
import { createdAcademicProgram, deleteAcademicProgramID, setAcademicPrograms, updateAcademicProgramID } from './programAcademicSlice';

export const tGetAllAcademicProgram = () => async (dispatch) => {
	try {
		const data = await getAllAcademicProgramServices();
        // console.log({data})
		dispatch(setAcademicPrograms(data));
	} catch (error) {
		console.log(error);
	}
};

export const tCreateAcademicProgram = ({ pracNombre, pracCodigo }, objAcademicProgram) => async (dispatch) => {
	try {
		 await createdAcademicProgramServices({ pracNombre, pracCodigo });
		dispatch(createdAcademicProgram(objAcademicProgram));
	} catch (error) {
		console.log(error);
	}

}


export const tUpdateAcademicProgram = (pracId, { pracNombre, pracCodigo }, index) => async (dispatch) => {
	try {
		const data = await updateAcademicProgramServices(pracId, { pracNombre, pracCodigo });
		console.log(data);
		dispatch(updateAcademicProgramID({data, index}))
	} catch (error) {
		console.log(error);
	}
};


export const tDeleteAcademicProgram = (pracId) => async (dispatch) => {
	try {
		const data = await deleteAcademicProgramServices(pracId);
		console.log(data);
		dispatch(deleteAcademicProgramID(pracId))
	} catch (error) {
		console.log(error)
	}
};
