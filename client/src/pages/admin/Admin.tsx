import './Admin.css'
import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext.tsx'
import { useNavigate } from 'react-router'
import LogoutButton from '../../components/LogoutButton.tsx'

const Admin = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const { isLoggedIn, login } = auth!;
  const [form, setForm] = useState({ username: '', password: '' })

if (!isLoggedIn) {
    return (
      <div className="page-content-container">
      <h1>ADMIN</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          login(form.username, form.password);
        }}
        className="admin-login-form"
      >
        <input
          type="text"
          placeholder="username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          className="admin-login-input"
        />
        <input
          type="password"
          placeholder="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="admin-login-input"
        />
        <button type="submit" className='form-btn'>login</button>
      </form>
      </div>
    );
  }

    return (
    <div className="page-content-container">
        <h1>ADMIN</h1>
        <div className="admin-nav-container">
          <button className="admin-nav-btn" onClick={() => navigate('/admin/shows')}>
            manage shows
          </button>
          <button className="admin-nav-btn" onClick={() => navigate('/admin/merch')}>
            manage merch
          </button>
          <LogoutButton />
        </div>
    </div>
  );

}

export default Admin