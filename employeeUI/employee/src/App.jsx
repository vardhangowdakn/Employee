import React from 'react';
import './App.css';
import Header from './pages/Header';
import Dashboard from './pages/Dashboard';
import PostEmployee from './pages/PostEmployee';
import EditEmployee from './pages/EditEmployee';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-employee" element={<PostEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
      </Routes>
    </>
  );
}

export default App;
