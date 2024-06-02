import planDeMejoramientoApi from '../wrappers/planDeMejoramiento';




const singIn = async ({token, tiusId,pracId}) => {
    try {
        const { data } = await planDeMejoramientoApi.post('/login', { token, tiusId,pracId });
        return data;
    } catch (error) {
        console.log(error);
        const { response } = error;
        
        if (response?.status === 400) return alert(response?.data?.error);
    }
};


export {singIn};