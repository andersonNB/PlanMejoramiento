import { createBrowserRouter ,  } from 'react-router-dom';
import HomePage from '../views/Home/HomePage';
import LoginPage from '../views/auth/login/LoginPage';
import { AcademyProgram } from '../components/AcademyProgram/AcademyProgram';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage isAdmin={false} />,
	},
	{
		path: '/dashboard',
		element: <HomePage />,
	},
	{
		path:'/programa-academico',
		element: <AcademyProgram/>
	}
], {
	basename: '/PlanMejoramiento',
  });	

export default router;
