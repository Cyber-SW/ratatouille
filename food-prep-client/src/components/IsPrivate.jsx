import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import PacmanLoader from "react-spinners/PacmanLoader";

// Pages with isPrivate component can be visited from logged in users only
function IsPrivate({ children }) {
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

IsPrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsPrivate;
