import React, { useState } from "react";
import PropTypes from "prop-types";

import btn from "../../assets/icons/plus.png";
import trash from "../../assets/icons/trash.png";
import modify from "../../assets/icons/modify.png";
import validation from "../../assets/icons/validation.png";

function ModalStep({ all, setAll }) {
  const [step, setStep] = useState("");

  const handleStep = (e) => {
    setStep(e.target.value);
  };

  const handleUnlockInput = (key) => {
    setStep(all.recipe.steps[key]);
    const nextStep = { ...all.recipe.steps };
    nextStep[key] = null;
    setAll({ ...all, recipe: { ...all.recipe, steps: nextStep } });
  };
  const handleModifStep = (key) => {
    if (step !== null && step !== "") {
      const nextStep = { ...all.recipe.steps };
      nextStep[key] = step;
      setAll({ ...all, recipe: { ...all.recipe, steps: nextStep } });
    } else {
      setStep("");
    }
  };
  const handleAddStep = () => {
    const newSteps = all.recipe.steps;
    const lastKey = Object.keys(all.recipe.steps).length;
    newSteps[parseInt(lastKey, 10) + 1] = "";
    setAll({ ...all, recipe: { ...all.recipe, steps: newSteps } });
    setStep("");
  };

  const handleDeleteStep = (key) => {
    const actualStep = { ...all.recipe.steps };
    delete actualStep[key];
    const newSteps = {};
    let newIndex = 1;
    for (const stepKey in actualStep) {
      if (actualStep) {
        newSteps[newIndex] = actualStep[stepKey];
        newIndex += 1;
      }
    }
    setAll({ ...all, recipe: { ...all.recipe, steps: newSteps } });
  };

  const handleValid = () => {
    document.getElementById("addSteps").close();
  };
  const allStepsValid = Object.keys(all.recipe.steps).every((key) => {
    const stepValue = all.recipe.steps[key];
    return stepValue !== null && stepValue !== "";
  });
  return (
    <dialog id="addSteps" className="modal   ">
      <form method="dialog" className="modal-box bg-neutral   ">
        <h3 className="font-bold text-lg text-center">Étapes</h3>
        <div className="md:text-xl">
          {Object.entries(all.recipe.steps).map(([key]) => (
            <div key={key}>
              <p
                className={` p-2 text-accent inline-block rounded-lg  ${
                  all.recipe.steps[key] === "" || all.recipe.steps[key] === null
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              >
                Étape {key}
              </p>
              <div className="flex">
                {all.recipe.steps[key] ? (
                  <div className="flex items-center justify-between w-full">
                    <p
                      className={`"m-1 my-2 " ${
                        allStepsValid ? " w-2/3" : "w-full"
                      } `}
                    >
                      {all.recipe.steps[key]}
                    </p>
                    {allStepsValid && (
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => handleUnlockInput(key)}
                        >
                          <img src={modify} alt="modifier" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteStep(key)}
                        >
                          <img src={trash} alt="corbeille" className="w-10" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full">
                    <input
                      value={step}
                      type="text"
                      className="bg-accent  my-3 w-full pl-2 h-10"
                      onChange={handleStep}
                    />
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => handleModifStep(key)}
                    >
                      <img src={validation} alt="valider" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {allStepsValid && (
          <div>
            <div className="flex justify-center">
              <button
                type="button"
                className="text-center"
                onClick={handleAddStep}
              >
                <img src={btn} alt="ajouter une etape" />
              </button>
            </div>
            <div className="modal-action">
              <button
                type="button"
                className="btn bg-secondary text-neutral border-0 "
                onClick={handleValid}
              >
                Valider les étapes
              </button>
            </div>
          </div>
        )}
      </form>
    </dialog>
  );
}

export default ModalStep;
ModalStep.propTypes = {
  all: PropTypes.shape({
    recipe: PropTypes.shape({
      steps: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};
