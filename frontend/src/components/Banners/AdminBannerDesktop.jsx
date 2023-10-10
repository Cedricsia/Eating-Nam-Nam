import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

function AdminBannerDesktop({ user }) {
  const id = localStorage.getItem("user");

  return (
    <div className="flex flex-col justify-start w-[19rem] items-center bg-accent text-center font-bold text-xl gap-y-14 pt-14 px-4 pb-20 whitespace-normal">
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
      <p className="font-heading mb-8">{user.pseudo}</p>
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
          to={`/user/recipes-management/${id}`}
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          Gestion des recettes
        </NavLink>
      </li>
      <li className="text-base-content hover:text-primary cursor-pointer list-none">
        <NavLink
          to={`/user/ing-management/${id}`}
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          Gestion des ingrédients
        </NavLink>
      </li>
      <li className="text-base-content hover:text-primary cursor-pointer list-none">
        <NavLink
          to={`/user/users-management/${id}`}
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          Gestion des utilisateurs
        </NavLink>
      </li>
      <li className="text-base-content hover:text-primary cursor-pointer list-none">
        <NavLink
          to={`/user/comments-management/${id}`}
          className={({ isActive }) => (isActive ? " text-primary" : "")}
        >
          Gestion des commentaires
        </NavLink>
      </li>
    </div>
  );
}

AdminBannerDesktop.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    pseudo: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminBannerDesktop;
