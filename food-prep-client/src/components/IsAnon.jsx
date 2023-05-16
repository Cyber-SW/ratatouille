import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) { 
    return <Navigate to="/new-meal" />;
  } else {
    return children;
  }
}

IsAnon.propTypes = {
  children: PropTypes.node.isRequired
};

export default IsAnon;