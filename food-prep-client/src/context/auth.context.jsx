import React, { useState, useEffect } from "react";
import authService from "./../services/auth.service";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"


const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }  
  
    
  const authenticateUser = () => { 
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService.verify()
        .then((response) => {
          const user = response.data;   
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {      
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
          console.log(error);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }


  const removeToken = () => {
    localStorage.removeItem("authToken");
  }

  
  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate("/")
  }    


  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

AuthProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export { AuthProviderWrapper, AuthContext };