import { useDispatch, useSelector } from 'react-redux';
import { tCreateStrategicAxis, tGetAllStrategicAxes, tUpdateStrategicAxis } from '../../store/slice/strategicAxis/thunkStrategicAxis.js';

const useSelectorStrategicAxis = () => {
	const dispatch = useDispatch();
	const { strategicAxes } = useSelector((state) => state.STRATEGIC_AXIS);

	const getAllStrategicAxes = () => {
		dispatch(tGetAllStrategicAxes());
	};

	const createStrategicAxis = ({ ejesNombre },objFactor) => {
		dispatch(tCreateStrategicAxis({ ejesNombre },objFactor));
		getAllStrategicAxes()
	}

	const updateStrategicAxis = (ejesId, { ejesNombre }, index) => {
		dispatch(tUpdateStrategicAxis(ejesId, { ejesNombre }, index));
	};


	return {
		//STATE
		strategicAxes,
		//FUNCTIONS
		getAllStrategicAxes,
		updateStrategicAxis,
		createStrategicAxis
	};
};

export default useSelectorStrategicAxis;
