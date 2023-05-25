import Navbar from "../components/Navbar";
import { useState, useContext, useEffect } from "react";
import userService from "../services/user.service";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function FavoritesPage() {
  const { user } = useContext(AuthContext);

  const [favorites, setFavorites] = useState([]);
  const [toggleHeadline, setHeadline] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    userService
      .fetchUserData()
      .then((response) => setFavorites(response.data.favorites));
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth > 431 && !toggleHeadline) {
    setHeadline(true);
  }

  return (
    <div className="no-scroll">
      <Navbar />

      <div
        className="fav-container"
        style={{ scrollbarColor: "transparent", overflowX: "auto" }}
        onWheel={(e) => {
          const strength = Math.abs(e.deltaY);
          if (e.deltaY === 0) return;

          const el = e.currentTarget;
          if (
            !(el.scrollLeft === 0 && e.deltaY < 0) &&
            !(
              el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) ===
                0 && e.deltaY > 0
            )
          ) {
            e.preventDefault();
          }
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            behavior: strength > 70 ? "auto" : "smooth",
          });
        }}
      >
        {favorites &&
          favorites.map((meal) => (
            <div key={meal._id} className="fav-container-align">
              <h2 className={"fav-headline " + (toggleHeadline ? "hide" : "")}>
                {meal.mealInformation.split("\n")[0].replace("Meal name: ", "")}
              </h2>
              <Link to={`/favorite/meal-details/${meal._id}`}>
                <img
                  id="fav-img"
                  src={meal.mealImage}
                  alt="meal img"
                  width={300}
                />
              </Link>
              <div className="fav-spec">
                <h3 className="fav-subline">
                  {meal.mealInformation
                    .split("\n")[2]
                    .replace(/(Time:\s*.+).*/, "$1")}
                </h3>
                <h3 className="fav-subline">
                  {meal.mealInformation
                    .split("\n")[1]
                    .replace(/(Kcal:\s*\d+).*/, "$1")}
                </h3>
              </div>
              <h2 className={"fav-headline " + (toggleHeadline ? "" : "hide")}>
                {meal.mealInformation.split("\n")[0].replace("Meal name: ", "")}
              </h2>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
