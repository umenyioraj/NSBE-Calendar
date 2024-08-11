import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import NSBE from '../assets/NSBE.png'
import '../App.css' 



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, password };

    try {
        const response = await fetch('https://nsbe-calendar.onrender.com/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          login(); // have to call login function to change auth state
            navigate('/');
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Failed to login. Please try again later.');
      }
    };

  return (
    <div>
      <div className='background-container'></div>
      <div className='logo-container'>
                <img src={NSBE} alt="NSBE Event" className='logo' />
            </div>
      <div className='login-container'>
              <p>Welcome To Nova NSBE </p>
      </div>
      <div className='login-logo'>
      <h2>Login</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='username-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='password-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='login-button'>
        <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
