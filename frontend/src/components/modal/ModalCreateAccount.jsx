/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import expressAPI from "../../services/expressAPI";

function ModalCreateAccount() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const closeModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").close();
  };

  const onSubmit = (data) => {
    expressAPI
      .post("/auth/sign-up", data)
      .then(() => {
        toast.success(
          "Votre inscription a réussi. Vous pouvez vous connecter.",
          {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          }
        );
        document.getElementById("creationModal").close();
        document.getElementById("connectionModal").showModal();
      })
      .catch(() => {
        toast.error("Renseigner correctement vos identifiants", {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      });
  };

  return (
    <div>
      <dialog
        id="creationModal"
        className="bg-transparent drop-shadow-lg modal"
      >
        <div
          method="dialog"
          className="md:w-[56rem] modal-box shadow-none bg-neutral text-base-content"
        >
          <h2 className="font-bold text-xl mb-4 text-center">
            Créer un compte
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="md:grid md:grid-cols-2 md:gap-7 text-left">
              <div>
                <label htmlFor="firstname" className="pt-4 pb-1  font-bold">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("firstname", {
                    required: true,
                  })}
                  aria-invalid={errors.firstname ? "true" : "false"}
                />
                {errors.firstname && (
                  <span>Le champs prénom est obligatoire</span>
                )}
              </div>
              <div className="">
                <label htmlFor="lastname" className="pt-4 pb-1 font-bold">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("lastname", {
                    required: true,
                  })}
                  aria-invalid={errors.lastname ? "true" : "false"}
                />
                {errors.lastname && <span>Le champ nom est obligatoire</span>}
              </div>
              <div>
                <label htmlFor="username" className="pt-4 pb-1  font-bold">
                  Pseudo
                </label>
                <input
                  type="text"
                  name="pseudo"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("pseudo", {
                    required: true,
                  })}
                  aria-invalid={errors.pseudo ? "true" : "false"}
                />
                {errors.pseudo && <span>Le champ pseudo est obligatoire</span>}
              </div>
              <div>
                <label htmlFor="email" className="pt-4 pb-1  font-bold">
                  Email
                </label>
                <input
                  type="email"
                  name="creationMail"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("creationMail", {
                    required: true,
                  })}
                  aria-invalid={errors.creationMail ? "true" : "false"}
                />
                {errors.creationMail && (
                  <span>Le champ email est invalide</span>
                )}
              </div>
              <div>
                <label htmlFor="password" className="pt-4 pb-1  font-bold">
                  Mot de passe
                </label>
                <input
                  type={passwordIsVisible ? "text" : "password"}
                  name="password"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("password", {
                    pattern:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    required: true,
                  })}
                  aria-invalid={errors.creationPassword ? "true" : "false"}
                />
                {errors.password && (
                  <p>
                    Le mot de passe est obligatoire et doit contenir 8
                    caractères, une majuscule, une minuscule, un caractères
                    spécial et un chiffre
                  </p>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPasswordIsVisible((prevState) => !prevState)
                  }
                  className="text-sm"
                >
                  {passwordIsVisible
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"}
                </button>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="pt-4 pb-1  font-bold"
                >
                  Confirmer mot de passe
                </label>
                <input
                  type={passwordIsVisible ? "text" : "password"}
                  name="confirmPassword"
                  className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                  {...register("confirmPassword", {
                    required: true,
                    validate: () =>
                      watch("password") === watch("confirmPassword") ||
                      "Les mots de passe ne sont pas similaires",
                  })}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                />
                {errors.confirmPassword && (
                  <span>{errors.confirmPassword.message}</span>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setPasswordIsVisible((prevState) => !prevState)
                  }
                  className="text-sm"
                >
                  {passwordIsVisible
                    ? "Cacher le mot de passe"
                    : "Afficher le mot de passe"}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-secondary px-8 py-1 text-neutral text-md md:text-lg rounded-md mt-10 w-48 md:w-56 h-10"
              >
                Créer un compte
              </button>
            </div>
          </form>

          <button
            type="button"
            onClick={closeModal}
            className="btn btn-sm btn-circle btn-ghost bg-accent text-neutral hover:text-base-content absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={closeModal}>
            Fermer
          </button>
        </form>
      </dialog>
      <ToastContainer theme="colored" />
    </div>
  );
}

export default ModalCreateAccount;
