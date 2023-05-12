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

    fetchUserMeal = (userId, newMeal) => {
        console.log("request body", newMeal)
        return this.api.post(`api/user/new-meal/${userId}`, { newMeal: newMeal })
    }
}

const userService = new UserService();

export default userService;