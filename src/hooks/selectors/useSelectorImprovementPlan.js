import { useDispatch, useSelector } from 'react-redux';
import {
	tCreateImprovementPlan,
	tGetAllImprovementPlanByAcademicProgram,
	tGetAllImprovementPlan,
	tUpdateImprovementPlan
} from '../../store/slice/ImprovementPlan/thunkImprovementPlanSlice.js';

const useSelectorImprovementPlan = () => {
	const dispatch = useDispatch();
	const { improvementPlans } = useSelector((state) => state.IMPROVEMENT_PLAN);

	const getAllImprovementPlans = () => {
		dispatch(tGetAllImprovementPlan());
	};

	const getAllImprovementPlansByAcademicProgram = (pracId) => {
		dispatch(tGetAllImprovementPlanByAcademicProgram(pracId));
	};

	const createImprovementPlan = ({ plmeNombre, pracId }, objPlan) => {
		dispatch(tCreateImprovementPlan({ plmeNombre, pracId }, objPlan));
		getAllImprovementPlans();
	};

	const updateImprovementPlan = (plmeId, { plmeNombre, pracId }, index) => {
		dispatch(tUpdateImprovementPlan(plmeId, { plmeNombre, pracId }, index));
	};

	return {
		//STATE
		improvementPlans,
		//FUNCTIONS
		getAllImprovementPlans,
		updateImprovementPlan,
		createImprovementPlan,
		getAllImprovementPlansByAcademicProgram
	};
};

export default useSelectorImprovementPlan;
