import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";

import imgCooking from "../assets/recipe-book.png";

function User() {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    expressAPI.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div className="bg-neutral">
      {user && (
        <div>
          {user.role === "User" ? (
            <>
              <UserBannerMobile user={user} />
              <div className="flex justify-center md:justify-normal">
                <UserBannerDesktop user={user} />
                <div className="md:hidden flex flex-col justify-center items-center gap-14 my-8 text-xl font-bold">
                  <Link to={`/user/infos/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Mes informations
                    </p>
                  </Link>
                  <Link to={`/user/recipes/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Mes recettes
                    </p>
                  </Link>
                  <Link to="/user/search-user">
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Rechercher un utilisateur
                    </p>
                  </Link>
                </div>
                <div className="hidden md:flex md:justify-center md:items-center w-full">
                  <img
                    src={imgCooking}
                    alt="Dessin de cuisine"
                    className="md:h-96 lg:h-[30rem]"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <UserBannerMobile user={user} />
              <div className="flex justify-center md:justify-normal">
                <UserBannerDesktop user={user} />
                <div className="md:hidden flex flex-col justify-center items-center gap-14 my-8 text-xl font-bold">
                  <Link to={`/user/infos/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Mes informations
                    </p>
                  </Link>
                  <p className="text-base-content hover:text-primary cursor-pointer list-none">
                    <Link
                      to={`/user/recipes/${id}`}
                      className={({ isActive }) =>
                        isActive ? " text-primary" : ""
                      }
                    >
                      Mes recettes
                    </Link>
                  </p>
                  <p className="text-base-content hover:text-primary cursor-pointer list-none">
                    <Link
                      to="/user/search-user"
                      className={({ isActive }) =>
                        isActive ? " text-primary" : ""
                      }
                    >
                      Rechercher un utilisateur
                    </Link>
                  </p>
                  <Link to={`/user/recipes-management/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Gestion des recettes
                    </p>
                  </Link>
                  <Link to={`/user/ing-management/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Gestion des ingrédients
                    </p>
                  </Link>
                  <Link to={`/user/users-management/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Gestion des utilisateurs
                    </p>
                  </Link>
                  <Link to={`/user/comments-management/${id}`}>
                    <p className="text-base-content hover:text-primary cursor-pointer">
                      Gestion des commentaires
                    </p>
                  </Link>
                </div>
                <div className="hidden md:flex md:justify-center md:items-center w-full">
                  <img
                    src={imgCooking}
                    alt="Dessin de cuisine"
                    className="md:h-96 lg:h-[30rem]"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
