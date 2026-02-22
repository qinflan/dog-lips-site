import { useAuth } from './AuthContext';
import { Navigate } from 'react-router';

const AuthProvider = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuth();
  if (!auth || !auth.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default AuthProvider;