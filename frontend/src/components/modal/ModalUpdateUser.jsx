/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from "prop-types";
import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import trash from "../../assets/icons/trash.png";

import expressAPI from "../../services/expressAPI";

function ModalUpdateUser({ userToUpdate, setIsUpdated }) {
  const [newValue, setNewValue] = useState(null);

  const handleNewValue = (e, key) => {
    setNewValue({ ...userToUpdate, [key]: e.target.value });
  };

  const handleDelete = (key) => {
    setNewValue({ ...userToUpdate, [key]: "userDefault.png" });
  };

  const closeModal = () => {
    document.getElementById("updateUser").close();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    expressAPI
      .put(`admin/user/${userToUpdate.user_id}`, newValue)
      .then((res) => {
        if (res.status === 204) {
          document.getElementById("updateUser").close();
          setIsUpdated(true);
        } else {
          toast.error("Un problème inattendu est survenu", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const roleOptions = [
    { value: "User", text: "User" },
    { value: "Admin", text: "Admin" },
  ];

  return (
    <dialog id="updateUser" className="bg-transparent drop-shadow-lg modal">
      <form
        onSubmit={handleSubmit}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content "
      >
        <h1 className="text-center">Modifier l'utilisateur</h1>
        <h2 className="my-5">Informations</h2>
        <div className=" grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
          <label htmlFor="firstname" className="h-12">
            Prénom :
          </label>
          <input
            type="text"
            defaultValue={userToUpdate.firstname}
            className="bg-accent rounded-md h-8 py-2 px-2 lg:px-4 font-normal text-lg"
            onChange={(e) => handleNewValue(e, "firstname")}
          />
          <label htmlFor="lastname" className="h-12">
            Nom :
          </label>
          <input
            defaultValue={userToUpdate.lastname}
            type="text"
            className="bg-accent rounded-md h-8 py-2 px-2 lg:px-4 font-normal text-lg"
            onChange={(e) => handleNewValue(e, "lastname")}
          />
          <label htmlFor="username" className="h-12">
            Pseudo :
          </label>
          <input
            type="text"
            defaultValue={userToUpdate.pseudo}
            className="bg-accent rounded-md h-8 py-2 px-2 lg:px-4 font-normal text-lg"
            onChange={(e) => handleNewValue(e, "pseudo")}
          />

          <label htmlFor="age" className="h-12">
            Age :
          </label>
          <input
            type="number"
            defaultValue={userToUpdate.age}
            className="bg-accent rounded-md h-8 py-2 px-2 lg:px-4 font-normal text-lg"
            onChange={(e) => handleNewValue(e, "age")}
          />
          <label htmlFor="gender" className="h-12">
            Genre :
          </label>
          <select
            defaultValue={userToUpdate.gender}
            onChange={(e) => handleNewValue(e, "gender")}
            className="bg-accent rounded-md h-8 px-2 lg:px-4 font-normal text-lg"
          >
            {genderOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                selected={userToUpdate.gender === option.value}
              >
                {option.text}
              </option>
            ))}
          </select>
          <label htmlFor="socio" className="h-12">
            Catégorie socioprofessionnelle :
          </label>
          <select
            defaultValue={userToUpdate.socio}
            onChange={(e) => handleNewValue(e, "socio")}
            className="mb-4 bg-accent h-8 rounded-md px-2 lg:px-4 font-normal text-lg"
          >
            {socioOptions.map((option) => (
              <option
                key={option.value}
                value={option.newValuevalue}
                selected={userToUpdate.socio === option.value}
              >
                {option.text}
              </option>
            ))}
          </select>
          <label htmlFor="mail" className="h-16">
            Adresse email :
          </label>
          <input
            defaultValue={userToUpdate.mail}
            type="text"
            className="bg-accent rounded-md h-8 py-2 px-2 lg:px-4 font-normal text-lg"
            onChange={(e) => handleNewValue(e, "mail")}
          />
          <label htmlFor="nb_recipe" className="h-12">
            Nombre de recettes créées : {userToUpdate.nb_recipe}
          </label>
        </div>
        <h2 className="my-6">Modifier le rôle de l'utilisateur</h2>
        <div className="mb-12 flex flex-col">
          <label htmlFor="role">Rôle :</label>
          <select
            defaultValue={userToUpdate.role}
            onChange={(e) => handleNewValue(e, "role")}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="profilPicture">Photo :</label>
        </div>
        <div className="flex justify-center items-end m-[1rem] md:avatar">
          <div className="md:flex md:justify-center md:rounded-full w-[8rem]">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                userToUpdate.image
              }`}
              alt="Profil"
              className=""
            />
          </div>
          <button
            type="button"
            onClick={() => handleDelete("image")}
            className=" cursor-pointer w-[4rem] h-[4rem]"
          >
            <img
              src={trash}
              alt="poubelle"
              className="object-contain h-[3rem] ml-5"
            />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-secondary text-neutral"
          >
            Enregistrer
          </button>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost bg-accent text-neutral hover:text-base-content absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          Fermer
        </button>
      </form>
      <ToastContainer theme="colored" />
    </dialog>
  );
}

ModalUpdateUser.propTypes = {
  userToUpdate: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    socio: PropTypes.string,
    role: PropTypes.string.isRequired,
    gender: PropTypes.string,
    mail: PropTypes.string.isRequired,
    age: PropTypes.number,
    image: PropTypes.string,
    nb_recipe: PropTypes.number.isRequired,
  }).isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

export default ModalUpdateUser;
