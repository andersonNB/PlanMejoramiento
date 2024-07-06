import { useDispatch, useSelector } from 'react-redux';
import {
	tCreateImprovementPlan,
	tGetAllImprovementPlanByAcademicProgram,
	tGetAllImprovementPlan,
	tUpdateImprovementPlan, tSetImprovementPlan
} from '../../store/slice/ImprovementPlan/thunkImprovementPlanSlice.js';

const useSelectorImprovementPlan = () => {
	const dispatch = useDispatch();
	const { improvementPlans, improvementPlan } = useSelector((state) => state.IMPROVEMENT_PLAN);

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

	const setImprovementPlan = ({ plmeId, plmeNombre, pracId }, objPlan) => {
		dispatch(tSetImprovementPlan(plmeId, { plmeNombre, pracId }, objPlan));
		getAllImprovementPlans();
	};


	return {
		//STATE
		improvementPlan,
		improvementPlans,
		//FUNCTIONS
		setImprovementPlan,
		getAllImprovementPlans,
		updateImprovementPlan,
		createImprovementPlan,
		getAllImprovementPlansByAcademicProgram
	};
};

export default useSelectorImprovementPlan;
