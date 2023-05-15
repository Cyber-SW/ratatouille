import axios from "axios"


class UserService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL,
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    fetchUserData = (userId) => {
        return this.api.get(`api/user/${userId}`)
    }

    storeUserAppState = (userId, appState) => {
        return this.api.post(`api/user/${userId}/update-state`, { appState: appState })
    }

    updateUserProfile = (userId, updatedInfo) => {
        return this.api.post(`api/user/${userId}/profile/edit`, { updatedInfo: updatedInfo })
    }

    updateUserShoppingList = (userId, newItem) => {
        return this.api.post(`api/user/${userId}/shopping-list/update`, { newItem: newItem })
    }

    deleteOneShoppingList = (userId, index) => {
        return this.api.post(`api/user/${userId}/shopping-list/delete-one`, { index: index })
    }

    deleteAllShoppingList = (userId) => {
        console.log("delte all", userId)
        return this.api.post(`api/user/${userId}/shopping-list/delete-all`)
    }

    fetchUserMeal = (userId, newMeal) => {
        return this.api.post(`api/user/${userId}/new-meal`, { newMeal: newMeal })
    }

    fetchMealImage = (newMealName) => {
        return this.api.get(`api/user/new-meal/${newMealName}`)
    }
}

const userService = new UserService();

export default userService;