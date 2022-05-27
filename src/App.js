import React from 'react';
import { Routes, Route } from "react-router-dom";
// import dotEnv from 'dotenv';

import Home from './pages/Home';
import Auth from './pages/Auth';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './util/authContext';

// dotEnv.config();

const App = () => {
  const { token, login, logout } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    )
  }
  else {
    routes = (
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    )
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        login: login,
        logout: logout
      }}>
      {routes}
    </AuthContext.Provider>
  );
};

export default App;