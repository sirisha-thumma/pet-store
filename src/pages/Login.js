import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PET_STORE_API_URL } from '../utils/constants';
import { useAuth } from '../context/AuthContext';
import './login.css'
import axios from 'axios';

const LoginPage = () => {
  const { isLoggedIn, sessionId, login, logout } = useAuth();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
      e.preventDefault();
      try{
        const resp = await axios.get(`${PET_STORE_API_URL}/user/login?username=${userName}&password=${password}`)
        const sessionId = resp?.data?.split(": ")[1];
        login(sessionId);
        navigate('/', {replace: true, state: location.pathname});
      }catch(error) {
        logout();
      }
  }

  useEffect(() => {
    if(isLoggedIn && sessionId) {
      navigate('/', {replace: true});
    }
  }, []);

  return (
    <div className='login-container'>
      <form className='login-form' onSubmit={handleLogin}>
          <h2 className='login-form-header'>Login to Pet Store App</h2>
          <div className="form-group">
              <label htmlFor="username">User name</label>
              <input name="username" type="text" placeholder="Enter Username" required value={userName} onChange={(e) => setUserName(e.target.value)}/>
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input name="password" type="password" placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} data-testid="password"/>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
  )
}

export default LoginPage
