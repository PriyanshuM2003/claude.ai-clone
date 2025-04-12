import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/dashboard'
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";

function App() {
  
  return (
    <>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>

    </>
  )
}

export default App
