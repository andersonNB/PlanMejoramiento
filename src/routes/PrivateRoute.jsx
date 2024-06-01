import  { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';


const PrivateRoute = ({ element: Component, ...rest }) => {
  const { logged } = useContext(AuthContext);
  console.log({logged})
  return logged ? <Component {...rest} /> : <Navigate to="/" replace  />;
};

export default PrivateRoute;
