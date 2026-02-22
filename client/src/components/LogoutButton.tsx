import './LogoutButton.css'
import { useAuth } from '../auth/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuth()!;
  return (
    <button className="logout-btn" onClick={logout}>
      logout
    </button>
  )
}

export default LogoutButton