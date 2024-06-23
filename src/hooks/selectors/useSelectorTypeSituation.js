import { useDispatch, useSelector } from 'react-redux';
import { tCreateTypeSituation, tGetAllTypeSituation } from '../../store/slice/TypeSituation/thunkTypeSituation';

const useSelectorTypeSituation = () => {
	const dispatch = useDispatch();
	const { typeSituations } = useSelector((state) => state.TYPE_SITUATION);

	const createTypeSituation = ({ tisiNombre }) => {
		dispatch(tCreateTypeSituation({ tisiNombre }));
		// getAllTypeSituation();
	};

    const getAllTypeSituation = ()=>{
        dispatch(tGetAllTypeSituation());
    };

	return {
		//STATE
		typeSituations,
		//FUNCTIONS
		createTypeSituation,
        getAllTypeSituation,
	};
};

export default useSelectorTypeSituation;
