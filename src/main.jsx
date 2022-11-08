import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom"
import "./index.css"
import Navbar from '../components/Navbar'
import AuthProvider from "./context/auth"


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
)
