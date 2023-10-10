import PropTypes from "prop-types";

import { useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function UpdatePassword({
  user,
  isUpdated,
  setIsUpdated,
  passwordIsBeingModified,
  setPasswordIsBeingModified,
}) {
  const [userReq, setUserReq] = useState({ ...user, confirmPassword: "" });
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const { id } = useParams();

  const handleInputChange = (e, key) => {
    setUserReq({ ...userReq, [key]: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    expressAPI
      .put(`/user-password/${id}`, userReq)
      .then((res) => {
        if (res.status === 204) {
          setPasswordIsBeingModified(false);
          setIsUpdated(!isUpdated);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setPasswordIsBeingModified(!passwordIsBeingModified);
  };
  return (
    <div className="flex flex-col">
      <div className="font-bold w-full">
        <form
          onSubmit={handleChange}
          className="text-xl md:text-2xl grid grid-cols-[100px_200px] md:grid-cols-[150px_250px] lg:grid-cols-[180px_350px] xl:grid-cols-[120px_300px_130px_300px] lg:gap-x-6 items-start justify-center gap-y-6 md:gap-y-14 lg:gap-y-10 xl:gap-y-14 my-8 md:my-14 md:mx-10 "
        >
          <label htmlFor="password" className="md:mr-4 lg:mr-0">
            Mot de passe :
          </label>
          <div>
            <input
              type={passwordIsVisible ? "text" : "password"}
              defaultValue=""
              className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl w-[200px] md:w-[250px] lg:w-[350px] xl:w-[300px]"
              onChange={(e) => handleInputChange(e, "password")}
            />
            <button
              type="button"
              onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              className="text-sm"
            >
              {passwordIsVisible
                ? "Cacher le mot de passe"
                : "Afficher le mot de passe"}
            </button>
          </div>
          <label htmlFor="confirmPassword" className="md:mr-4 lg:mr-0">
            Confirmer le mot de passe :
          </label>
          <div>
            <input
              type={passwordIsVisible ? "text" : "password"}
              defaultValue=""
              className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl w-[200px] md:w-[250px] lg:w-[350px] xl:w-[300px]"
              onChange={(e) => handleInputChange(e, "confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setPasswordIsVisible((prevState) => !prevState)}
              className="text-sm"
            >
              {passwordIsVisible
                ? "Cacher le mot de passe"
                : "Afficher le mot de passe"}
            </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={handleEdit}
          className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md mt-8 lg:mt-14 --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        >
          Enregistrer le mot de passe
        </button>
      </div>
    </div>
  );
}

UpdatePassword.propTypes = {
  user: PropTypes.shape({
    password: PropTypes.string.isRequired,
  }).isRequired,
  passwordIsBeingModified: PropTypes.bool.isRequired,
  setPasswordIsBeingModified: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

export default UpdatePassword;
