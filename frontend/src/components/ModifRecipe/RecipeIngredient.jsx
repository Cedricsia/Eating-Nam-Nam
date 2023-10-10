import React from "react";
import PropTypes from "prop-types";
import ModalIngredient from "../modal/ModalIngredient";

function RecipeIngredient({ all, setAll }) {
  return (
    <div>
      <div>
        <h2 className="mt-10 mb-5 text-xl">Ingrédients</h2>
        <ul className="list-disc list-inside ml-7 md:text-lg md:pr-2">
          {all.ingredients.map((ing) => (
            <li key={ing.name}>
              {ing.quantity} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>
        <div className="flex  justify-center">
          <button
            type="button"
            className="btn btn-primary text-neutral mt-3"
            onClick={() => window.ing.showModal()}
          >
            Modifier
          </button>
        </div>
      </div>
      <ModalIngredient all={all} setAll={setAll} />
    </div>
  );
}

export default RecipeIngredient;
RecipeIngredient.propTypes = {
  all: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};
