import Navbar from "../components/Navbar"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/auth.context"
import userDataService from "../services/userData.service"



function UserDashboardPage() {
    const [userData, setUserData] = useState(null)

    const { user } = useContext(AuthContext)

    useEffect(() => {
        console.log("user data", userData)
    }, [userData])

    

    useEffect(() => {
        userDataService.fetchUserData(user._id)
            .then(response => {
                setUserData(response.data)
            })
    }, [])



    return (
        <div>
            <Navbar />

        </div>
    )
}

export default UserDashboardPage