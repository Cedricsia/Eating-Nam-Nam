import React from "react";
import PropTypes from "prop-types";
import ModalStep from "../modal/ModalStep";

function RecipeStep({ all, setAll }) {
  return (
    <div>
      <h2 className="mt-10 mb-5 text-xl w">Étapes</h2>
      {Object.entries(all.recipe.steps).map(([key]) => (
        <div className="  flex flex-col rounded-2xls mx-1  ">
          <div className="flex" key={key}>
            <div className="bg-secondary w-24 h-7 rounded-md flex justify-center items-center text-accent md:text-lg md:w-32 md:h-10">
              Étape {key}
            </div>
            <div className="flex w-full min-h-8 ml-2 -mt-0.5 mb-2.5 items-center md:text-lg md:ml-4 md:mb-6 md:max-w-md lg:max-w-lg xl:max-w-2xl">
              {all.recipe.steps[key]}
            </div>
          </div>
        </div>
      ))}
      <div className="flex  flex-col  items-center">
        <button
          type="button"
          className="btn btn-primary text-neutral"
          onClick={() => window.addSteps.showModal()}
        >
          Modifier
        </button>
      </div>
      <ModalStep all={all} setAll={setAll} />
    </div>
  );
}

export default RecipeStep;
RecipeStep.propTypes = {
  all: PropTypes.shape({
    recipe: PropTypes.shape({
      steps: PropTypes.objectOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};
