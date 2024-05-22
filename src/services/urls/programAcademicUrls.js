export const env = 'dev';

const URLS = {
	dev: import.meta.env.VITE_API_URL,
	// prod:import.meta.env.REACT_APP_SERVICE_URL_PROD,
	// qa:import.meta.env.REACT_APP_SERVICE_URL_QA,
	// reg:import.meta.env.REACT_APP_SERVICE_URL_REG,
};

const URL_DEFAULT = 'http://localhost:3030/';

const programAcademicUrls = URLS[env] || URL_DEFAULT;

export default programAcademicUrls;
