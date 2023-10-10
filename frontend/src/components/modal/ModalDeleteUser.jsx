import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

function ModalDeleteUser({ users, setUsers, setIsUpdated, userToDelete }) {
  const closeModal = () => {
    document.getElementById("deleteUser").close();
  };

  const handleDelete = () => {
    expressAPI
      .delete(`admin/user/${userToDelete.user_id}`)
      .then((res) => {
        if (res.status === 204) {
          setUsers(users.filter((user) => user.id !== userToDelete.user_id));
          setIsUpdated(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <dialog id="deleteUser" className="bg-transparent drop-shadow-lg modal">
      <form
        onSubmit={handleDelete}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content md:w-[56rem]"
      >
        <h1 className="text-center mt-4">Effacer l'utilisateur</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <p>
              Êtes-vous sûr de vouloir supprimer l'utilisateur :{" "}
              {userToDelete.firstname} {userToDelete.lastname} ?
            </p>

            <div className="flex-col flex md:flex-row justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-primary mt-8 text-neutral"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-secondary mt-8 text-neutral"
              >
                Supprimer l'utilisateur
              </button>
            </div>
          </div>
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
    </dialog>
  );
}

ModalDeleteUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setUsers: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  userToDelete: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModalDeleteUser;
