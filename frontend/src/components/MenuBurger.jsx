import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

import expressAPI from "../services/expressAPI";

function MenuBurger() {
  const { user, setUser } = useCurrentUserContext();
  const navigate = useNavigate();
  const handleClick = () => {
    expressAPI.get("/auth/logout").then((res) => {
      if (res.status === 200) {
        localStorage.clear();
        setUser(null);
      } else {
        toast.error("Impossible de se déconnecter", {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      }
    });
    navigate("/");
  };

  const handleProfile = () => {
    const id = localStorage.getItem("user");
    navigate(`/user/${id}`);
  };

  return (
    <div>
      {user && (
        <div className="dropdown dropdown-end z-50 relative md:hidden">
          <button
            type="button"
            tabIndex={0}
            className="btn btn-ghost btn-circle mr-3"
            htmlFor="burger"
          >
            <svg
              id="burger"
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul className="menu-sm dropdown-content bg-accent w-screen right-0 z-50 relative mt-2">
            <li className="h-10 border-t-2 font-bold flex justify-center items-center text-sm pr-2">
              <Link to="/recipes">Recettes</Link>
            </li>
            <li className="h-10 border-t-2 font-bold flex justify-center items-center text-sm pr-2">
              <Link to="/create-recipe">Créer une recette</Link>
            </li>
            <li className="h-10 border-t-2 font-bold flex justify-center items-center text-sm pr-2">
              <button type="button" onClick={handleProfile}>
                Mon profil
              </button>
            </li>
            <li className="h-10 border-t-2 font-bold flex justify-center items-center text-sm pr-2">
              <button type="button" onClick={handleClick}>
                Déconnexion
              </button>
            </li>
            <ToastContainer theme="colored" />
          </ul>
        </div>
      )}
    </div>
  );
}

export default MenuBurger;
