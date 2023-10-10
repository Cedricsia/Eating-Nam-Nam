import PropTypes from "prop-types";

import trash from "../assets/icons/trash.png";
import modify from "../assets/icons/modify.png";

function LatestRecipeTable({ recipe, setRecipeId, setRecipeToDelete }) {
  const handleDelete = () => {
    setRecipeToDelete(recipe);
    document.getElementById("deleteRecipe").showModal();
  };

  return (
    <tbody className="bg-neutral">
      <tr
        key={recipe.id}
        className="hover:text-primary hover:font-bold text-lg"
      >
        <td>{recipe.name}</td>
        <td>
          <div className="avatar flex justify-center md:hidden">
            <div className="rounded-full w-12">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                  recipe.user_img
                }`}
                alt="Utilisateur"
              />
            </div>
          </div>
          <p className="hidden md:flex">{recipe.user_pseudo}</p>
        </td>
        <td>
          <div className="avatar ">
            <button
              type="button"
              className="rounded-full w-8 md:w-12"
              onClick={() => setRecipeId(recipe.id)}
            >
              <img src={modify} alt="Modifier" />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full w-8 md:w-12"
            >
              <img src={trash} alt="Supprimer" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

LatestRecipeTable.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    user_img: PropTypes.string.isRequired,
    user_pseudo: PropTypes.string.isRequired,
  }).isRequired,
  setRecipeId: PropTypes.func.isRequired,
  setRecipeToDelete: PropTypes.func.isRequired,
};

export default LatestRecipeTable;
