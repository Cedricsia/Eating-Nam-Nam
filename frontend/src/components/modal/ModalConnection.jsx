import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import expressAPI from "../../services/expressAPI";

function ModalConnection() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [fields, setFields] = useState({
    mailConnection: "",
    passwordConnection: "",
  });
  const { setUser } = useCurrentUserContext();

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fields.mailConnection.length && fields.passwordConnection.length) {
      expressAPI
        .post("/auth/sign-in", fields)
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", res.data);
          document.getElementById("connectionModal").close();
        })
        .catch(() => {
          toast.error("Identifiants incorrects", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
        });
    } else {
      toast.error("Renseigner correctement vos identifiants", {
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
  };

  const openCreateAccountModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").showModal();
  };

  const closeModal = () => {
    document.getElementById("connectionModal").close();
    document.getElementById("creationModal").close();
  };

  return (
    <dialog
      id="connectionModal"
      className="bg-transparent drop-shadow-lg modal"
    >
      <form
        onSubmit={handleSubmit}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content md:w-[56rem]"
      >
        <h2 className="font-bold text-xl text-center">Connectez-vous</h2>
        <div>
          <p className="pt-4 pb-1 text-left font-bold">Email</p>
          <input
            id="mailConnection"
            value={fields.mailConnection}
            name="mail"
            onChange={handleChange}
            type="mail"
            className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <p className="pt-4 pb-1 text-left font-bold">Mot de passe</p>
          <input
            id="passwordConnection"
            value={fields.passwordConnection}
            name="password"
            onChange={handleChange}
            type={passwordIsVisible ? "text" : "password"}
            className="bg-accent rounded-md h-10 px-4 w-full focus:outline-none focus:ring-2 focus:ring-primary"
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
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="bg-secondary px-8 py-1 text-neutral rounded-md mt-8 w-56 lg:mt-14"
          >
            Se connecter
          </button>
        </div>
        <p className="border-b-2 mt-6" />
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={openCreateAccountModal}
            className="text-base-content px-8 py-1 font-bold rounded-md mt-4 hover:text-primary"
          >
            Créer un compte
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

export default ModalConnection;
