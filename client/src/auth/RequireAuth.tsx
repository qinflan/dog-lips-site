import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router';

const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuth();
  if (!auth || !auth.isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

export default RequireAuth;