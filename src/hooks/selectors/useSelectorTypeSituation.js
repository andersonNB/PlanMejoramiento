import { useDispatch, useSelector } from 'react-redux';
import { tCreateTypeSituation, tGetAllTypeSituation, tUpdateTypeSituationID } from '../../store/slice/TypeSituation/thunkTypeSituation';

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

	const updateTypeSituationID = ({ id ,tisiNombre}) => {
		dispatch(tUpdateTypeSituationID({ id, tisiNombre }));
	
	}

	return {
		//STATE
		typeSituations,
		//FUNCTIONS
		createTypeSituation,
        getAllTypeSituation,
		updateTypeSituationID
	};
};

export default useSelectorTypeSituation;
