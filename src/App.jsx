import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';

const id_client = import.meta.env.VITE_ID_CLIENT_GOOGLE;
function App() {
	return (
		<GoogleOAuthProvider clientId={id_client}>
			<RouterProvider router={router} />
		</GoogleOAuthProvider>
	);
}

export default App;
