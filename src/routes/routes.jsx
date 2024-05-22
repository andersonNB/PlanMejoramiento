import { createBrowserRouter ,  } from 'react-router-dom';
import HomePage from '../views/Home/HomePage';
import LoginPage from '../views/auth/login/LoginPage';
import { AcademyProgram } from '../components/AcademyProgram/AcademyProgram';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage isAdmin={true} />,
	},
	{
		path: '/dashboard',
		element: <HomePage />,
	},
	{
		path:'/programa-academico',
		element: <AcademyProgram/>
	}
]);

export default router;
