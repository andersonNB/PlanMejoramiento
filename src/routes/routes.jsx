import { Navigate, createBrowserRouter } from 'react-router-dom';
import {
	AcademyProgram, Factor, ImprovementPlan, InvestmentProgram, Process, StrategicAxis, StrategicLine, TypeSituation,
	ImprovementAction
} from '../components/index.js';
import HomePage from '../views/Home/HomePage';
import LoginPage from '../views/auth/login/LoginPage';
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
		path: '/programa-inversion',
		element: <PrivateRoute element={InvestmentProgram} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/plan-mejoramiento',
		element: <PrivateRoute element={ImprovementPlan} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/tipo-situacion',
		element: <PrivateRoute element={TypeSituation} />,
		errorElement: <ErrorPage />
	},
	{
		path: '/accion-mejora',
		element: <PrivateRoute element={ImprovementAction} />,
		errorElement: <ErrorPage />
	},
	{
		path: '*',
		element: <Navigate to="/login" />,
		errorElement: <ErrorPage />
	}
]);

export default router;
