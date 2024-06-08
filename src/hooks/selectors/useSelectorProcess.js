import { useDispatch, useSelector } from 'react-redux';
import { tCreateProcess, tGetAllprocesses, tUpdateProcess } from '../../store/slice/process/thunkProcess.js';

const useSelectorProcess = () => {
	const dispatch = useDispatch();
	const { processes } = useSelector((state) => state.PROCESS);

	const getAllProcess = () => {
		dispatch(tGetAllprocesses());
	};

	const createProcess = ({ procNombre },objProcess) => {
		dispatch(tCreateProcess({ procNombre },objProcess));
		getAllProcess()
	}

	const updateProcess = (procId, { procNombre }, index) => {
		dispatch(tUpdateProcess(procId, { procNombre }, index));
	};


	return {
		//STATE
		processes,
		//FUNCTIONS
		getAllProcess,
		updateProcess,
		createProcess
	};
};

export default useSelectorProcess;
