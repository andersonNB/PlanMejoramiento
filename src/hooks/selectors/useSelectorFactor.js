import { useDispatch, useSelector } from 'react-redux';
import { tCreateFactor, tGetAllFactorTypes, tUpdateFactor, tGetAllFactor } from '../../store/slice/factor/thunkFactor.js';

const useSelectorFactor = () => {
	const dispatch = useDispatch();
	const { factorTypes, factors } = useSelector((state) => state.FACTOR);

	const getAllFactorTypes = () => {
		dispatch(tGetAllFactorTypes());
	};

	const getAllFactor = () => {
		dispatch(tGetAllFactor());
	};

	const createFactor = ({ factNombre, tifaId },objFactor) => {
		dispatch(tCreateFactor({ factNombre, tifaId },objFactor));
		getAllFactor()
	}

	const updateFactor = (factId, { factNombre, tifaId }, index) => {
		dispatch(tUpdateFactor(factId, { factNombre, tifaId }, index));
	};


	return {
		//STATE
		factors,
		factorTypes,
		//FUNCTIONS
		getAllFactor,
		getAllFactorTypes,
		updateFactor,
		createFactor
	};
};

export default useSelectorFactor;
