import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';

export const createdTypeSituationServices = async ({ tisiNombre }) => {
	try {
		const { data } = await planDeMejoramientoApi.post('/situation-type', { tisiNombre });
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};


export const getAllTypeSituationServices = async () => {
    try{
        const {data} = await planDeMejoramientoApi.get('/situation-type');
        console.log(data)
        return data;
    }catch(error){
        console.log(error)
    }
}
