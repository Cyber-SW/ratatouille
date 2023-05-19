import axios from "axios"


class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL,
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    fetchUserData = () => {
        return this.api.get(`api/user`)
    }

    storeUserAppState = (appState) => {
        return this.api.post(`api/user/update-state`, { appState: appState })
    }

    updateUserProfile = (updatedInfo) => {
        return this.api.post(`api/user/profile/edit`, { updatedInfo: updatedInfo })
    }

    updateUserShoppingList = (newItem) => {
        return this.api.post(`api/user/shopping-list/update`, { newItem: newItem })
    }

    deleteOneShoppingList = (index) => {
        return this.api.post(`api/user/shopping-list/delete-one`, { index: index })
    }

    deleteAllShoppingList = () => {
        return this.api.post(`api/user/shopping-list/delete-all`)
    }

    addMealToFavorites = (meal) => {
        return this.api.post(`api/user/favorites/add`, { meal: meal })
    }

    fetchFavoriteMeal = (mealId) => {
        return this.api.get(`api/user/favorite/meal-details/${mealId}`)
    }

    deleteFavoriteMeal = (mealId) => {
        return this.api.post(`api/user/favorite/meal-details/${mealId}/delete`)
    }

    fetchUserMeal = (newMeal) => {
        return this.api.post(`api/user/new-meal`, { newMeal: newMeal })
    }

    fetchMealImage = (newMealName) => {
        return this.api.get(`api/user/new-meal/${newMealName}`)
    }
}

const userService = new UserService();

export default userService;