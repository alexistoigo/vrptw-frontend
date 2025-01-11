import React, {} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RouteForm from './components/RouteForm/RouteForm';

function App() {
  return (
    <Routes>
      <Route path="/form" element={<RouteForm />} />
      <Route path="*" element={<Navigate to="/form" />} />
    </Routes>
  );
}

export default App;
