import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

const userType = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/user_type');
		return data;
	} catch (error) {
		console.error(error);
	}
};

export { userType };
