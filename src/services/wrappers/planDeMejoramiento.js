import axios from 'axios';
import programAcademicUrls from '../urls/programAcademicUrls';


const planDeMejoramientoApi = axios.create({
  baseURL: programAcademicUrls
});

planDeMejoramientoApi.interceptors.request.use(config => {
  //Con este interceptor cada petición que hagamos tendra el token
  config.headers = {
    ...config.headers,
    Authorization: localStorage.getItem('token')
  };

  return config;
});


// Interceptor de respuesta
planDeMejoramientoApi.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.clear();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default planDeMejoramientoApi;