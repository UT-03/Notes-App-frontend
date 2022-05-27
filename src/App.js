import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Auth from './pages/Auth';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './util/authContext';

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
      <Route path="/" element={<Auth />} />
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