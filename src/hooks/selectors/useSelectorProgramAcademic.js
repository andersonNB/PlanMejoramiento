import { useDispatch, useSelector } from 'react-redux';
import { tCreateAcademicProgram, tDeleteAcademicProgram, tGetAllAcademicProgram, tUpdateAcademicProgram } from '../../store/slice/programAcademic/thunkProgramAcademic';

const useSelectorProgramAcademic = () => {
	const dispatch = useDispatch();
	const { academicPrograms } = useSelector((state) => state.PROGRAM_ACADEMIC);

	const getAllAcademicProgram = () => {
		dispatch(tGetAllAcademicProgram());
	};

	const createAcademicProgram = ({ pracNombre, pracCodigo },objAcademicProgram) => {
		dispatch(tCreateAcademicProgram({ pracNombre, pracCodigo },objAcademicProgram));
	
	}

	const updateAcademicProgram = (pracId, { pracNombre, pracCodigo }, index) => {
		dispatch(tUpdateAcademicProgram(pracId, { pracNombre, pracCodigo }, index));
	};


	const deleteAcademicProgram = ({pracId}) => {
		dispatch(tDeleteAcademicProgram(pracId));
	};

	return {
		//STATE
		academicPrograms,
		//FUNCTIONS
		getAllAcademicProgram,
		updateAcademicProgram,
		deleteAcademicProgram,
		createAcademicProgram,
	};
};

export default useSelectorProgramAcademic;
