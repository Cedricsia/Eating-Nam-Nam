import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import expressAPI from "../services/expressAPI";

import logo from "../assets/logo.png";
import MenuBurger from "./MenuBurger";
import ModalConnection from "./modal/ModalConnection";
import ModalCreateAccount from "./modal/ModalCreateAccount";

function Navbar() {
  const { user, setUser } = useCurrentUserContext();
  const [pathname, setPathname] = useState(false);
  const [id, setId] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.startsWith("/most-popular-recipe/")) {
      setPathname(true);
    } else {
      setPathname(false);
    }
  }, [location]);

  const handleLogout = () => {
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
  useEffect(() => {
    const userId = localStorage.getItem("user");
    setId(userId);
  });

  const openConnectionModal = () => {
    document.getElementById("connectionModal").showModal();
  };

  return (
    <header>
      <nav className="bg-accent text-base-content h-24 drop-shadow-lg flex items-center justify-between font-bold">
        <NavLink to="/">
          <img src={logo} alt="Logo Eating Nam-Nam" className="max-h-24" />
        </NavLink>
        {pathname ? (
          <div>
            {!user ? (
              <button
                type="button"
                onClick={openConnectionModal}
                className="mr-8"
              >
                Se connecter
              </button>
            ) : null}
          </div>
        ) : null}
        {user && (
          <>
            <MenuBurger />
            <ul className="hidden md:flex list-none gap-8">
              <li>
                <NavLink
                  to="/recipes"
                  className={({ isActive }) =>
                    isActive ? " text-primary" : ""
                  }
                >
                  Recettes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create-recipe"
                  className={({ isActive }) =>
                    isActive ? " text-primary" : ""
                  }
                >
                  Créer une recette
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/user/infos/${id}`}
                  className={({ isActive }) =>
                    isActive ? " text-primary" : ""
                  }
                >
                  Mon profil
                </NavLink>
              </li>
              <li>
                <button type="button" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
              <ToastContainer theme="colored" />
            </ul>
          </>
        )}
      </nav>
      <ModalConnection />
      <ModalCreateAccount />
    </header>
  );
}

export default Navbar;
