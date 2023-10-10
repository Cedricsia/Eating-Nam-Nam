import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import AdminBannerDesktop from "./AdminBannerDesktop";
import expressAPI from "../../services/expressAPI";

function UserBannerDesktop({ user }) {
  const [badge, setBadge] = useState(null);
  const id = localStorage.getItem("user");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [num, setNum] = useState(0);
  const handleWatch = (badgeId) => {
    if (num === 0) {
      setNum(badgeId);
    } else {
      setNum(0);
    }
  };

  useEffect(() => {
    expressAPI.get(`/users-badges/${parseInt(user.id, 10)}`).then((res) => {
      setBadge(res.data);
    });
  }, []);

  return (
    <div className="hidden md:flex min-h-[86vh]">
      {user.role === "User" ? (
        <div className="flex flex-col justify-start w-64 items-center bg-accent text-center font-bold text-xl gap-y-14 pt-14 px-4 pb-20 whitespace-normal">
          <p className="font-bold ml-4 mt-4">Mon compte</p>
          <div className="avatar z-10 ">
            <div className="z-10 flex md:justify-center rounded-full w-44">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                  user.image
                }`}
                alt="Profil"
                className="h-36 w-36 z-10 rounded-full"
              />
            </div>
          </div>
          <p className="font-normal ">{user.pseudo}</p>
          <div className="grid grid-cols-4  gap-2">
            {badge &&
              badge.map((elem) => (
                <div>
                  <button type="button" onClick={() => handleWatch(elem.id)}>
                    <img
                      src={`${backendUrl}/${elem.image}`}
                      alt="badge"
                      title={elem.content}
                      className="h-10 hidden lg:flex"
                    />
                  </button>
                </div>
              ))}
          </div>
          <li className="text-base-content hover:text-primary cursor-pointer list-none">
            <NavLink
              to={`/user/infos/${id}`}
              className={({ isActive }) => (isActive ? " text-primary" : "")}
            >
              Mes informations
            </NavLink>
          </li>
          <li className="text-base-content hover:text-primary cursor-pointer list-none">
            <NavLink
              to={`/user/recipes/${id}`}
              className={({ isActive }) => (isActive ? " text-primary" : "")}
            >
              Mes recettes
            </NavLink>
          </li>
          <li className="text-base-content hover:text-primary cursor-pointer list-none">
            <NavLink
              to="/user/search-user"
              className={({ isActive }) => (isActive ? " text-primary" : "")}
            >
              Rechercher un utilisateur
            </NavLink>
          </li>
        </div>
      ) : (
        <AdminBannerDesktop user={user} />
      )}
    </div>
  );
}

UserBannerDesktop.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    pseudo: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserBannerDesktop;
