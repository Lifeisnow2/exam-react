import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';

const PrivateRoutes = () => {
  const { expiry } = useContext(AuthContext);
  console.log(expiry - Date.now());

  //can check JWT instead of just simple date as in example
  const isValidUser = expiry > Date.now();

  return isValidUser ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
