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

            

            <div className="fav-container">
            {favorites && favorites.map((meal) => (
            <div key={meal._id}>
                
                    <h2 className="meal-headline">{meal.mealInformation.split("\n")[0].replace("Meal name: ", "")}</h2>
                    <Link to={`/favorite/meal-details/${meal._id}`}>
                    <img id="fav-img" src={meal.mealImage} alt="meal img" width={300} />
                    </Link>
                <div className="fav-spec">
                    <h3 className="fav-subline">{meal.mealInformation.split("\n")[1]}</h3>
                    <h3 className="fav-subline">{meal.mealInformation.split("\n")[2]}</h3>
                </div>
            </div>
            ))}
            </div>
        </div>
    )
}

export default FavoritesPage