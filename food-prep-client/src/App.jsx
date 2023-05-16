import './App.css'
import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import NewMealPage from "./pages/NewMealPage"
import IsAnon from './components/IsAnon'
import IsPrivate from './components/isPrivate'
import MealDetailsPage from "./pages/MealDetailsPage"
import FavoritesPage from "./pages/FavoritesPage"
import ShoppingListPage from "./pages/ShoppingListPage"
import ProfilePage from "./pages/ProfilePage"
import FavoriteMealDetailsPage from "./pages/FavoriteMealDetailsPage"


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />
        <Route path="/new-meal" element={<IsPrivate> <NewMealPage /> </IsPrivate>} />
        <Route path="/favorites" element={<IsPrivate> <FavoritesPage /> </IsPrivate>} />
        <Route path="/shopping-list" element={<IsPrivate> <ShoppingListPage /> </IsPrivate>} />
        <Route path="/profile" element={<IsPrivate> <ProfilePage /> </IsPrivate>} />
        <Route path="/meal-details" element={<IsPrivate> <MealDetailsPage /> </IsPrivate>} />
        <Route path="/favorite/meal-details/:mealId" element={<IsPrivate> <FavoriteMealDetailsPage /> </IsPrivate>} />
      </Routes>
    </div>
  )
}

export default App
