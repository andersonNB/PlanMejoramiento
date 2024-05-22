import planDeMejoramientoApi from '../wrappers/programAcademicWrapper';

const getAcademicProgramID = async ({pracNombre,pracCodigo
}) => {
    // dispatch(onChecking());
    //TODO:Creación de thunks
    try {
      const { data } = await planDeMejoramientoApi.post('/academic_program',{pracNombre,pracCodigo} );
      console.log(data);
      } catch (error) {
      console.log(error);
    }
  }
export {
    getAcademicProgramID,
}
