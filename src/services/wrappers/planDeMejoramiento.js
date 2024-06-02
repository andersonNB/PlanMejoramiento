import axios from 'axios';
import programAcademicUrls from '../urls/programAcademicUrls';


const planDeMejoramientoApi = axios.create({
  baseURL: programAcademicUrls
});

planDeMejoramientoApi.interceptors.request.use(config => {
  //Con este interceptor cada petición que hagamos tendra el token
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('token')
  };

  return config;
});

export default planDeMejoramientoApi;