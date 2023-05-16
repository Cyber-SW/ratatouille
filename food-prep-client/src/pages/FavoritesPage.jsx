import Navbar from "../components/Navbar"
import { useState, useContext, useEffect } from "react"
import userService from "../services/user.service"
import { AuthContext } from "../context/auth.context"
import { Link }from "react-router-dom"


function FavoritesPage() {
    const { user } = useContext(AuthContext)

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        userService.fetchUserData()
            .then((response) => setFavorites(response.data.favorites))
    }, [user])

    console.log("FAVORITES", favorites)


    return (
        <div>
            <Navbar />


            <h1>Favorites</h1>

            { favorites && favorites.map((meal) => (
                <div key={meal._id}>
                { meal.mealInformation.split("\n").map((info, index) => (
                    <h2 key={index}>{info}</h2>
                )) }
                <Link to={`/favorite/meal-details/${meal._id}`}><img src={meal.mealImage} alt="meal img" width={300} /></Link>
                </div>
            )) }

        </div>
    )
}

export default FavoritesPage