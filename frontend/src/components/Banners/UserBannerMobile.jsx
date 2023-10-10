import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";

function UserBannerMobile({ user }) {
  const navigate = useNavigate();

  const handleProfile = () => {
    const id = localStorage.getItem("user");

    navigate(`/user/${id}`);
  };

  return (
    <div className="md:hidden bg-accent">
      <div className="flex flex-col">
        <div>
          <div>
            <button
              type="button"
              className="font-bold ml-4 mt-4"
              onClick={handleProfile}
            >
              <p> {"<<"} Menu</p>
            </button>
          </div>
          <div className=" flex items-center justify-evenly py-8 ">
            <div className="avatar static md:hidden ">
              <div className=" flex md:justify-center rounded-full w-32">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                    user.image
                  }`}
                  alt="Profil"
                  className=" rounded-full"
                />
              </div>
            </div>
            <div className="text-lg font-bold text-center flex flex-col gap-8">
              <h1 className="text-xl">Mon profil</h1>
              <p>{user.pseudo}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserBannerMobile.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserBannerMobile;
