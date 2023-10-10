import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

function ModalDeleteRecipe({
  recipes,
  setRecipes,
  setIsUpdated,
  recipeToDelete,
}) {
  const closeModal = () => {
    document.getElementById("deleteRecipe").close();
  };

  const handleDelete = () => {
    expressAPI
      .delete(`/recipes/${recipeToDelete.id}`)
      .then((res) => {
        if (res.status === 204) {
          setRecipes(
            recipes.filter((element) => element.id !== recipeToDelete.id)
          );
          setIsUpdated(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <dialog id="deleteRecipe" className="bg-transparent drop-shadow-lg modal">
      <form
        onSubmit={handleDelete}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content md:w-[56rem]"
      >
        <h1 className="text-center mt-4">Effacer la recette</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <p>
              Êtes-vous sûr de vouloir supprimer la recette :{" "}
              {recipeToDelete.name} ?
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
                Supprimer la recette
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

ModalDeleteRecipe.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setRecipes: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  recipeToDelete: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default ModalDeleteRecipe;
