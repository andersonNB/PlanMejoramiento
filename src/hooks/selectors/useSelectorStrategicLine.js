import { useDispatch, useSelector } from 'react-redux';
import {
	tCreateStrategicLine,
	tGetAllStrategicLines,
	tUpdateStrategicLine
} from '../../store/slice/strategicLine/thunkStrategicLine.js';

const useSelectorStrategicLine = () => {
	const dispatch = useDispatch();
	const { strategicLines } = useSelector((state) => state.STRATEGIC_LINE);

	const getAllStrategicLine = () => {
		dispatch(tGetAllStrategicLines());
	};

	const createStrategicLine = ({ liesNombre, liesObjetivos, ejesId }, objLinea) => {
		dispatch(tCreateStrategicLine({ liesNombre, liesObjetivos, ejesId }, objLinea));
		getAllStrategicLine();
	};

	const updateStrategicLine = (liesId, { liesNombre, liesObjetivos, ejesId }, index) => {
		dispatch(tUpdateStrategicLine(liesId, { liesNombre, liesObjetivos, ejesId }, index));
	};

	return {
		//STATE
		strategicLines,
		//FUNCTIONS
		getAllStrategicLine,
		updateStrategicLine,
		createStrategicLine
	};
};

export default useSelectorStrategicLine;
