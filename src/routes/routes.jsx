import { createBrowserRouter ,  } from 'react-router-dom';
import Home from '../components/Home/Home';
import LoginPage from '../components/Login/LoginPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage isAdmin={true} />,
	},
	{
		path: '/dashboard',
		element: <Home />,
	}
]);

export default router;
