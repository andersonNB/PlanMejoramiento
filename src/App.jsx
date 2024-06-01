import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import AuthProvider from './context/auth/AuthProvider';

const id_client = import.meta.env.VITE_ID_CLIENT_GOOGLE;
function App() {
	return (
		<GoogleOAuthProvider clientId={id_client}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</GoogleOAuthProvider>
	);
}

export default App;
