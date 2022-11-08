import { Route, Routes } from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/Login"
import PrivateRoute from "../pages/PrivateRoute"
import Register from "../pages/Register"
import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
