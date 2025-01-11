import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import RouteForm from './components/RouteForm/RouteForm';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={() => setAuthenticated(true)} />} />
      <Route path="/form" element={
        authenticated ? <RouteForm /> : <Navigate to="/login" />
      } />
      <Route path="*" element={<Navigate to={authenticated ? "/form" : "/login"} />} />
    </Routes>
  );
}

export default App;
