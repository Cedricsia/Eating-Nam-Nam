import PropTypes from "prop-types";

import { useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function UpdateInfo({
  user,
  isBeingModified,
  setIsBeingModified,
  isUpdated,
  setIsUpdated,
}) {
  const [userReq, setUserReq] = useState({ ...user, confirmPassword: "" });
  const [files, setFiles] = useState([]);

  const { id } = useParams();

  const genderOptions = [
    { value: "---", text: "---" },
    { value: "Femme", text: "Femme" },
    { value: "Homme", text: "Homme" },
    {
      value: "Je ne souhaite pas me prononcer",
      text: "Je ne souhaite pas me prononcer",
    },
  ];

  const socioOptions = [
    { value: "---", text: "---" },
    { value: "Agriculteurs exploitants", text: "Agriculteurs exploitants" },
    {
      value: "Artisans, commerçants et chefs d'entreprise",
      text: "Artisans, commerçants et chefs d'entreprise",
    },
    {
      value: "Cadres et professions intellectuelles supérieures",
      text: "Cadres et professions intellectuelles supérieures",
    },
    { value: "Professions intermédiaires", text: "Professions intermédiaires" },
    { value: "Employés", text: "Employés" },
    { value: "Ouvriers", text: "Ouvriers" },
    { value: "Retraités", text: "Retraités" },
    {
      value: "Autres personnes sans activité professionnelle",
      text: "Autres personnes sans activité professionnelle",
    },
  ];

  const handleInputChange = (e, key) => {
    setUserReq({ ...userReq, [key]: e.target.value });
  };

  const handleChange = (e) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    if (files.length === 0) {
      expressAPI
        .put(`/userswithoutPicture/${id}`, userReq)
        .then((res) => {
          if (res.status === 204) {
            setIsBeingModified(false);
            setIsUpdated(!isUpdated);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const formData = new FormData();
      formData.append("user", JSON.stringify(userReq));
      formData.append("file", files[0]);
      expressAPI
        .put(`/users/${id}`, formData)
        .then((res) => {
          if (res.status === 204) {
            setIsBeingModified(false);
            setIsUpdated(!isUpdated);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsBeingModified(!isBeingModified);
  };

  return (
    <div className="flex flex-col bg-neutral">
      <div className="font-bold w-full">
        <h1 className="text-center md:text-left md:pl-8 text-2xl md:text-3xl pt-8 md:pt-8">
          Mes informations
        </h1>
        <form
          onSubmit={handleChange}
          className="text-xl md:text-2xl grid grid-cols-[100px_200px] md:grid-cols-[150px_250px] lg:grid-cols-[180px_350px] xl:grid-cols-[120px_300px_130px_300px] lg:gap-x-6 items-center justify-center gap-y-6 md:gap-y-14 lg:gap-y-10 xl:gap-y-14 my-8 md:my-14 md:mx-10 "
        >
          <label htmlFor="lastname">Nom :</label>
          <input
            defaultValue={user.lastname}
            type="text"
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
            onChange={(e) => handleInputChange(e, "lastname")}
          />
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            defaultValue={user.firstname}
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
            onChange={(e) => handleInputChange(e, "firstname")}
          />
          <label htmlFor="username">Pseudo :</label>
          <input
            type="text"
            defaultValue={user.pseudo}
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
            onChange={(e) => handleInputChange(e, "pseudo")}
          />
          <label htmlFor="age">Age :</label>
          <input
            type="number"
            defaultValue={user.age}
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
            onChange={(e) => handleInputChange(e, "age")}
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            defaultValue={user.mail}
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
            onChange={(e) => handleInputChange(e, "mail")}
          />
          <label htmlFor="gender">Genre :</label>
          <select
            defaultValue={user.gender}
            onChange={(e) => handleInputChange(e, "gender")}
            className="bg-accent h-10 rounded-md py-2 px-2 lg:px-4 font-normal text-xl"
          >
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <label htmlFor="socio" className="whitespace-nowrap">
            Catégorie <br />
            socio pro. :
          </label>
          <select
            defaultValue={user.socio}
            onChange={(e) => handleInputChange(e, "socio")}
            className="mb-4 bg-accent h-10 rounded-md py-2 px-2 lg:px-4 font-normal text-xl"
          >
            {socioOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
          <label htmlFor="profilPicture">Photo :</label>
          <div>
            {user.image ? (
              <div>
                {files.length ? (
                  <div className="hidden md:avatar">
                    <div className="className=md:flex md:justify-center md:rounded-full w-44">
                      <img src={URL.createObjectURL(files[0])} alt="plat" />
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:avatar ">
                    <div className=" md:flex md:justify-center md:rounded-full w-44">
                      <img
                        src={`${
                          import.meta.env.VITE_BACKEND_URL
                        }/profilePicture/${user.image}`}
                        alt="Profil"
                        className=""
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="hidden md:avatar ">
                  <div className=" md:flex md:justify-center md:rounded-full w-44">
                    <img
                      src={URL.createObjectURL(files[0])}
                      className="w-[30rem]"
                      alt="plat"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
        <div className="flex mx-8 md:pl-8 md:mb-4 lg:pl-20 xl:pl-4">
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/png, image/jpeg, image/jpg"
            className="font-normal text-xl whitespace-normal"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <button
          type="button"
          onClick={handleEdit}
          className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md mt-8 lg:mt-14 --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}

UpdateInfo.propTypes = {
  user: PropTypes.shape({
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    age: PropTypes.number,
    mail: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    socio: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  isBeingModified: PropTypes.bool.isRequired,
  setIsBeingModified: PropTypes.func.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

export default UpdateInfo;
