import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import PrivateRoute from "../pages/PrivateRoute"
import Register from "../pages/Register"
import "./App.css"
import { AuthContext } from '../src/context/auth'
import { useContext } from "react"
import Profile from "../pages/Profile"
import UserProtectedRoute from "../pages/UserProtectedRoute"

function App() {

  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute user={user}>
          <Home />
        </PrivateRoute>
      } />
      <Route path="/profile" element={
        <PrivateRoute user={user}>
          <Profile />
        </PrivateRoute>} />
      <Route path="/register" element={
        <UserProtectedRoute user={user}>
          <Register />
        </UserProtectedRoute>} />
      <Route path="/login" element={
        <UserProtectedRoute user={user}>
          <Login />
        </UserProtectedRoute>} />
    </Routes>
  )
}

export default App
