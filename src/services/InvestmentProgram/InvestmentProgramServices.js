import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

const createdInvestmentProgramServices = async ({ prinNombre, liesId }) => {
	//TODO: Preguntar si es necesario enviar el ejeId
	try {
		const { data } = await planDeMejoramientoApi.post('/investment_program', { prinNombre, liesId });
		return data;
	} catch (error) {
		console.log(error);
		const { response } = error;
		if (response?.status === 400) return alert(response?.data?.error);
	}
};

const getAllInvestmentProgramServices = async () => {
	try {
		const { data } = await planDeMejoramientoApi.get('/investment_program');
		return data;
	} catch (error) {
		console.log(error);
	}
};

const updateInvestmentProgramServices = async ({ prinId, prinNombre, liesId }) => {
	//TODO: Preguntar si es necesario enviar el printId
	try {
		const { data } = await planDeMejoramientoApi.put(`/investment_program/${prinId}`, { prinNombre, liesId });
		return data;
	} catch (error) {
		console.log(error);
	}
};

const findByIdInvestmentProgramServices = async (prinId) => {
	try {
		const { data } = await planDeMejoramientoApi.get(`/investment_program/${prinId}`);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export {
	createdInvestmentProgramServices,
	getAllInvestmentProgramServices,
	updateInvestmentProgramServices,
	findByIdInvestmentProgramServices,
};
