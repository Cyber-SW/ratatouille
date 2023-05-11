import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import UserDashboardPage from "./pages/UserDashboardPage"
import IsAnon from './components/IsAnon'
import IsPrivate from './components/isPrivate'


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/dashboard" element={<IsPrivate> <UserDashboardPage /> </IsPrivate>} />
      </Routes>
    </div>
  )
}

export default App
