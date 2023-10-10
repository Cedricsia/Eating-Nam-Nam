import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

function DeleteIngredient({
  ingredients,
  setIngredients,
  setIsUpdated,
  ingredientToDelete,
}) {
  const closeModal = () => {
    document.getElementById("deleteIng").close();
  };

  const handleDelete = () => {
    expressAPI
      .delete(`/ingredient/${ingredientToDelete.id}`)
      .then((res) => {
        if (res.status === 204) {
          setIngredients(
            ingredients.filter(
              (element) => element.id !== ingredientToDelete.id
            )
          );

          setIsUpdated(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <dialog id="deleteIng" className="bg-transparent drop-shadow-lg modal">
      <form
        onSubmit={handleDelete}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content md:w-[56rem]"
      >
        <h1 className="text-center mt-4">Effacer l'ingrédient</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <p>
              Êtes-vous sûr de vouloir supprimer l'ingrédient :{" "}
              {ingredientToDelete.name} ?
            </p>
            <p>
              Cela entrainera la suppression des recettes dans lesquelles cet
              ingrédient apparait
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
                Supprimer l'ingrédient
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

DeleteIngredient.propTypes = {
  ingredientToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  ingredients: PropTypes.bool.isRequired,
  setIngredients: PropTypes.func.isRequired,
};

export default DeleteIngredient;
