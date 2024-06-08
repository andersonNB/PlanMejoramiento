import { Navigate, createBrowserRouter } from 'react-router-dom';
import HomePage from '../views/Home/HomePage';
import LoginPage from '../views/auth/login/LoginPage';
import { AcademyProgram } from '../components/AcademyProgram/AcademyProgram';
import { Factor } from '../components/Factor/Factor.jsx';
import { StrategicAxis } from '../components/StrategicAxis/StrategicAxis.jsx';
import { StrategicLine } from '../components/StrategicLine/StrategicLine.jsx';
import { Process } from '../components/Process/Process.jsx';
import { InvestmentProgram } from '../components/InvestmentProgram/InvestmentProgram.jsx';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute.jsx';
import ErrorPage from '../error-page.jsx';


const router = createBrowserRouter([
	{
		path: '/login',
		element: <AuthRoute element={LoginPage} isAdmin={false} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/login-admin',
		element: <AuthRoute element={LoginPage} isAdmin={true} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/dashboard',
		element: <PrivateRoute element={HomePage} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/programa-academico',
		element: <PrivateRoute element={AcademyProgram} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/factor',
		element: <PrivateRoute element={Factor} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/eje-estrategico',
		element: <PrivateRoute element={StrategicAxis} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/linea-estrategica',
		element: <PrivateRoute element={StrategicLine} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/proceso',
		element: <PrivateRoute element={Process} />,
		errorElement: <ErrorPage />
	},
	{
		path:'/programa-inversion',
		element: <PrivateRoute element={InvestmentProgram} />,
		errorElement: <ErrorPage />
	},
	{
		path: '*',
		element: <Navigate to="/login" />,
		errorElement: <ErrorPage />
	}
]);

export default router;
