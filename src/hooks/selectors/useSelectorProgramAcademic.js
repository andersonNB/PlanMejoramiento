import { useDispatch, useSelector } from 'react-redux';
import { tGetAllAcademicProgram, tUpdateAcademicProgram } from '../../store/slice/programAcademic/thunkProgramAcademic';

const useSelectorProgramAcademic = () => {
	const dispatch = useDispatch();
	const { academicPrograms } = useSelector((state) => state.PROGRAM_ACADEMIC);

	const getAllAcademicProgram = () => {
		dispatch(tGetAllAcademicProgram());
	};

	const updateAcademicProgram = (pracId, { pracNombre, pracCodigo }, index) => {
		dispatch(tUpdateAcademicProgram(pracId, { pracNombre, pracCodigo }, index));
	};

	return {
		//STATE
		academicPrograms,
		//FUNCTIONS
		getAllAcademicProgram,
		updateAcademicProgram,
	};
};

export default useSelectorProgramAcademic;
