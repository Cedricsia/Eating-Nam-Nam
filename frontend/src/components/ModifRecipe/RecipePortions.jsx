import { useState } from "react";
import PropTypes from "prop-types";

function RecipePortions({ all, setAll }) {
  const [portion, setPortion] = useState(all.recipe.initial_portion);
  const handleIncrement = () => {
    if (portion <= 9) {
      setPortion(portion + 1);
      const newIng = all.ingredients.map((ing) => {
        return {
          ...ing,
          quantity: parseInt((ing.quantity / portion) * (portion + 1), 10),
        };
      });

      setAll({
        ...all,
        ingredients: newIng,
        recipe: { ...all.recipe, initial_portion: portion + 1 },
      });
    }
  };
  const handleDecrease = () => {
    if (portion > 1) {
      setPortion(portion - 1);
      const newIng = all.ingredients.map((ing) => {
        return {
          ...ing,
          quantity: parseInt((ing.quantity / portion) * (portion - 1), 10),
        };
      });
      setAll({
        ...all,
        ingredients: newIng,
        recipe: { ...all.recipe, initial_portion: portion - 1 },
      });
    }
  };
  return (
    <div className="flex items-center justify-center my-5 md:justify-start md:ml-6 md:mt-12 lg:ml-16 ">
      <button
        type="button"
        className="text-3xl text-secondary border border-base-content rounded-l-lg px-2"
        onClick={handleDecrease}
      >
        -
      </button>
      <p className="text-xl text-primary px-3 py-1 border-y border-base-content">
        {`${portion} ${portion === 1 ? "personne" : "personnes"}`}
      </p>
      <button
        type="button"
        className="text-3xl text-secondary border border-base-content rounded-r-lg px-2"
        onClick={handleIncrement}
      >
        +
      </button>
    </div>
  );
}

RecipePortions.propTypes = {
  all: PropTypes.shape({
    recipe: PropTypes.shape({
      initial_portion: PropTypes.number.isRequired,
    }),
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};

export default RecipePortions;
