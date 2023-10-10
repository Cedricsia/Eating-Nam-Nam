import { useState } from "react";
import PropTypes from "prop-types";

function Portions({ recipe, setRecipe }) {
  const [portion, setPortion] = useState(1);
  const handleIncrement = () => {
    if (portion <= 9) {
      setPortion(portion + 1);
      setRecipe({ ...recipe, initial_portion: portion + 1 });
    }
  };
  const handleDecrease = () => {
    if (portion > 1) {
      setPortion(portion - 1);
      setRecipe({ ...recipe, initial_portion: portion - 1 });
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

Portions.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string,
    steps: PropTypes.objectOf(PropTypes.string),
    difficulty: PropTypes.string,
    cooking_time: PropTypes.number,
    time: PropTypes.number,
    nutrition: PropTypes.shape({
      proteins: PropTypes.number,
      fat: PropTypes.number,
      sugar: PropTypes.number,
      energy: PropTypes.number,
      fiber: PropTypes.number,
    }),
    initial_portion: PropTypes.number,
  }),
  setRecipe: PropTypes.func.isRequired,
};
Portions.defaultProps = {
  recipe: {
    name: "",
    steps: {
      1: "",
    },
    difficulty: "",
    cooking_time: null,
    time: null,
    nutrition: {
      proteins: null,
      fat: null,
      sugar: null,
      energy: null,
      fiber: null,
    },
    initial_portion: 1,
  },
};
export default Portions;
