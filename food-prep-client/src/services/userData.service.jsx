import axios from "axios"


class UserDataService {
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
}

const userDataService = new UserDataService();

export default userDataService;