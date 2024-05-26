import { getAllAcademicProgram, updateAcademicProgram } from '../../../services/programAcademic/programAcademicServices';
import { setAcademicPrograms, updateAcademicProgramID } from './programAcademicSlice';

export const tGetAllAcademicProgram = () => async (dispatch) => {
	try {
		const data = await getAllAcademicProgram();
        // console.log({data})
		dispatch(setAcademicPrograms(data));
	} catch (error) {
		console.log(error);
	}
};


export const tUpdateAcademicProgram = (pracId, { pracNombre, pracCodigo }, index) => async (dispatch) => {
	try {
		const data = await updateAcademicProgram(pracId, { pracNombre, pracCodigo });
		console.log(data);
		dispatch(updateAcademicProgramID({data, index}))
	} catch (error) {
		console.log(error);
	}
};
