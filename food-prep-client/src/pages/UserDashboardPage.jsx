import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import userDataService from "../services/userData.service"



function UserDashboardPage() {
    const [userData, setUserData] = useState({})
    
    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log("user data", userData)
    }, [userData])

    

    useEffect(() => {
        if (user) {
            userDataService.fetchUserData(user._id)
            .then(response => {
                setUserData(response.data)
            })
        }
    }, [user])



    return (
        <div>
            <Navbar />

            <h1>Dashboard</h1>
        </div>
    )
}

export default UserDashboardPage