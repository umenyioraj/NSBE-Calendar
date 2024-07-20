import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Home = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <h2>Home</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
