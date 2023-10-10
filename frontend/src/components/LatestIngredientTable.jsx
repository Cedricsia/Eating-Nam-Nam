import PropTypes from "prop-types";

import trash from "../assets/icons/trash.png";
import modify from "../assets/icons/modify.png";

function LatestIngredientTable({
  ingredient,
  setIngredientToUpdate,
  setIngredientToDelete,
}) {
  const handleDelete = () => {
    setIngredientToDelete(ingredient);
    document.getElementById("deleteIng").showModal();
  };

  const handleUpdate = () => {
    setIngredientToUpdate(ingredient);
    document.getElementById("updateIng").showModal();
  };

  return (
    <tbody>
      <tr
        key={ingredient.id}
        className="hover:text-primary hover:font-bold text-lg"
      >
        <td>{ingredient.name}</td>
        <td>
          <div className="avatar flex justify-center ">
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-full w-8 md:w-12"
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

LatestIngredientTable.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  setIngredientToUpdate: PropTypes.func.isRequired,
  setIngredientToDelete: PropTypes.func.isRequired,
};

export default LatestIngredientTable;
