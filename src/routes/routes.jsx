import { Navigate, createBrowserRouter ,  } from 'react-router-dom';
import HomePage from '../views/Home/HomePage';
import LoginPage from '../views/auth/login/LoginPage';
import { AcademyProgram } from '../components/AcademyProgram/AcademyProgram';
import { Factor } from '../components/Factor/Factor.jsx';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage isAdmin={false} />,
	},
	{
		path: '/dashboard',
		element: <PrivateRoute element={HomePage} />,
	},
	{
		path:'/programa-academico',
		element: <PrivateRoute element={AcademyProgram} />
	},
	{
		path:'/factor',
		element: <PrivateRoute element={Factor} />
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	}
]);	

export default router;
