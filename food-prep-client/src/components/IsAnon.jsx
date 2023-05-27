import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import PacmanLoader from "react-spinners/PacmanLoader";

// Pages with isAnon component can be visited from every user
function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading)
    return (
      <PacmanLoader
        className="pacman-loader"
        color={"#11B44D"}
        loading={isLoading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  if (isLoggedIn) {
    return <Navigate to="/new-meal" />;
  } else {
    return children;
  }
}

IsAnon.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsAnon;
