import planDeMejoramientoApi from '../wrappers/programAcademicWrapper';




const singIn = async ({token, tiusId,pracId}) => {
    try {
        const { data } = await planDeMejoramientoApi.post('/login', { token, tiusId,pracId });
        return data;
    } catch (error) {
        console.log(error);
    }
};


export {singIn};