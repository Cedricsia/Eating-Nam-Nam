import { useState } from "react";
import PropTypes from "prop-types";
import btnw from "../../assets/icons/plus_reverse.png";
import btn from "../../assets/icons/plus.png";
import trash from "../../assets/icons/trash.png";
import modify from "../../assets/icons/modify.png";
import validation from "../../assets/icons/validation.png";

function CookingStep({ recipe, setRecipe }) {
  const [step, setStep] = useState("");

  const handleModal = () => {
    document.getElementById("addSteps").showModal();
  };

  const handleStep = (e) => {
    setStep(e.target.value);
  };

  const handleUnlockInput = (key) => {
    setStep(recipe.steps[key]);
    const nextStep = { ...recipe.steps };
    nextStep[key] = null;
    setRecipe({ ...recipe, steps: nextStep });
  };
  const handleModifStep = (key) => {
    if (step !== null && step !== "") {
      const nextStep = { ...recipe.steps };
      nextStep[key] = step;
      setRecipe({ ...recipe, steps: nextStep });
    } else {
      setStep("");
    }
  };
  const handleAddStep = () => {
    if (step !== "") {
      const lastKey = Object.keys(recipe.steps).length;
      const nextStep = { ...recipe.steps };
      nextStep[lastKey] = step;
      nextStep[parseInt(lastKey, 10) + 1] = "";
      setRecipe({ ...recipe, steps: nextStep });
      setStep("");
    }
  };

  const handleDeleteStep = (key) => {
    const actualStep = { ...recipe.steps };
    delete actualStep[key];
    const newSteps = {};

    let newIndex = 1;

    for (const stepKey in actualStep) {
      if (actualStep) {
        newSteps[newIndex] = actualStep[stepKey];
        newIndex += 1;
      }
    }
    setRecipe({ ...recipe, steps: newSteps });
  };

  const handleValid = () => {
    let checkup = false;
    for (const key in recipe.steps) {
      if (recipe.steps[key] === null || step === "") {
        checkup = true;
      }
    }
    if (!checkup) {
      const lastKey = Object.keys(recipe.steps).length;
      const nextStep = { ...recipe.steps };
      nextStep[lastKey] = step;
      setRecipe({ ...recipe, steps: nextStep });
      document.getElementById("addSteps").close();
    }
  };
  const allStepsValid = Object.keys(recipe.steps).every((key) => {
    const stepValue = recipe.steps[key];
    return stepValue !== null && stepValue !== "";
  });

  return (
    <div>
      <div>
        <h2 className="mt-10 mb-5 ml-7 text-xl w">Étapes</h2>
        {Object.entries(recipe.steps).length >= 1 && recipe.steps[1] !== "" ? (
          <div className="  flex flex-col rounded-2xls mx-1  ">
            {Object.entries(recipe.steps).map(([key]) => (
              <div className="flex" key={key}>
                <div className="bg-secondary w-24 h-7 rounded-md flex justify-center items-center text-accent md:text-lg md:w-32 md:h-10">
                  Étape {key}
                </div>
                <div className="flex w-full min-h-8 ml-2 -mt-0.5 mb-2.5 items-center md:text-lg md:ml-4 md:mb-6 md:max-w-md lg:max-w-lg xl:max-w-2xl">
                  {recipe.steps[key]}
                </div>
              </div>
            ))}
            <div className="flex  flex-col  items-center">
              <button
                type="button"
                onClick={handleModal}
                className="btn btn-primary text-accent py-1 px-3"
              >
                Modifier
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-accent rounded-2xl  flex justify-center items-center  h-52 mx-10">
            <div className="flex  flex-col  items-center">
              <button type="button" onClick={handleModal}>
                <img src={btnw} alt="ajouter" />
              </button>
              <p>Ajouter les étapes</p>
            </div>
          </div>
        )}
        <div>
          <dialog id="addSteps" className="modal   ">
            <form method="dialog" className="modal-box bg-neutral   ">
              <h3 className="font-bold text-lg text-center md:text-2xl ">
                Étapes
              </h3>
              <div className="md:text-xl">
                {Object.entries(recipe.steps).map(([key]) => (
                  <div key={key}>
                    <p
                      className={` p-2 text-accent inline-block  rounded-lg ${
                        recipe.steps[key] === "" || recipe.steps[key] === null
                          ? "bg-primary"
                          : "bg-secondary"
                      }`}
                    >
                      Étape {key}
                    </p>
                    <div className="flex">
                      {recipe.steps[key] ? (
                        <div className="flex items-center justify-between w-full ml-2 flex-wrap">
                          <p
                            className={`"m-1 my-2 " ${
                              allStepsValid ? " w-2/3" : "w-full"
                            } `}
                          >
                            {recipe.steps[key]}
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
                                <img
                                  src={trash}
                                  alt="corbeille"
                                  className="w-10"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex w-full  items-center gap-2">
                          <input
                            value={step}
                            type="text"
                            className="bg-accent pl-2 my-3 w-10/12 h-8 md:h-10 "
                            onChange={handleStep}
                          />
                          <button
                            type="button"
                            onClick={() => handleModifStep(key)}
                            className=""
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
                      className="btn bg-secondary text-accent border-0 "
                      onClick={handleValid}
                    >
                      valider les etapes
                    </button>
                  </div>
                </div>
              )}
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}

CookingStep.propTypes = {
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
CookingStep.defaultProps = {
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
export default CookingStep;
