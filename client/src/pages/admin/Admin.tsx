import './Admin.css'
import { useState } from 'react'
import { useAuth } from '../../auth/AuthContext.tsx'

const Admin = () => {
  const auth = useAuth();
  if (!auth) {
    // Optionally render an error or fallback UI
    return <div>Auth context not found.</div>;
  }
const { isLoggedIn, login, logout } = auth
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
        <button type="submit" className='form-submit-btn'>login</button>
      </form>
      </div>
    );
  }

    return (
    <div className="page-content-container">
      <nav>
        <a href="/admin/add-show">add show</a>
        <a href="/admin/add-merch">add merch item</a>
        <button onClick={logout}>Logout</button>
      </nav>
    </div>
  );

}

export default Admin