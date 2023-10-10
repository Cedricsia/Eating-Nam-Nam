import { useState } from "react";
import PropTypes from "prop-types";
import validation from "../../assets/icons/validation.png";
import difficultyPicture from "../../assets/images/biceps.png";
import chrono from "../../assets/images/stopwatch.png";
import mortar from "../../assets/images/mortar.png";
import modify from "../../assets/icons/modify.png";

function CookingDetails({ recipe, setRecipe }) {
  const [cookingTime, setCookingTime] = useState(null);
  const [time, setTime] = useState(null);

  const handleRecipeDifficulty = (e) => {
    setRecipe({ ...recipe, difficulty: e.target.value });
  };
  const handleAddCreationTime = () => {
    setRecipe({ ...recipe, cooking_time: parseInt(cookingTime, 10) });
  };
  const handleCreationTime = (e) => {
    setCookingTime(e.target.value);
  };
  const handleAddTime = () => {
    setRecipe({ ...recipe, time: parseInt(time, 10) });
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  const handleModifyTime = () => {
    const newRecipe = { ...recipe };
    newRecipe.time = null;
    setRecipe(newRecipe);
  };
  const handleModifyCookingTime = () => {
    const newRecipe = { ...recipe };
    newRecipe.cooking_time = null;
    setRecipe(newRecipe);
  };

  return (
    <div className="md:flex md:flex-row md:justify-around  flex flex-col gap-3  m-5">
      <div className="col-span-1 ">
        <div>
          <h2 className="hidden md:flex md:mb-2">Temps total</h2>
          <div className="flex md:justify-center items-center gap-2 ">
            <img src={mortar} alt="chrono" className="h-5 md:h-8 " />
            <div className="flex items-center ">
              {recipe.time !== null ? (
                <div className="flex items-center">
                  <p className="text-lg">{recipe.time}</p>
                  <button type="button" onClick={handleModifyTime}>
                    <img src={modify} alt="modifier" className="w-8 mx-2" />
                  </button>
                </div>
              ) : (
                <div className="bg-accent rounded-xl flex mx-1">
                  <input
                    type="number"
                    name=""
                    min={0}
                    maxLength={3}
                    placeholder="00"
                    className="bg-accent ml-2 placeholder:text-base-content w-16 p-2"
                    onChange={handleTime}
                  />
                  <button
                    type="button"
                    className="mx-1 rounded-full"
                    onClick={handleAddTime}
                  >
                    <img
                      src={validation}
                      alt="valider"
                      className="w-8 text-center "
                    />
                  </button>
                </div>
              )}
              <p className="text-center text-lg hidden md:flex">min</p>
              <p className="text-center text-lg md:hidden">min total</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <h2 className="hidden md:flex md:mb-2">Difficulté</h2>
        <div className="flex md:justify-center items-center gap-2">
          <img src={difficultyPicture} alt="chrono" className="h-5 md:h-8" />
          <select
            name="difficulty"
            onChange={handleRecipeDifficulty}
            className="w-28 md:w-32 ml-1 bg-accent items-center rounded-xl text-lg p-2"
          >
            <option value="" className="">
              Ajouter
            </option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
      </div>
      <div className="col-span-1 ">
        <h2 className="hidden md:flex md:mb-2">Préparation</h2>
        <div className="flex md:justify-center items-center gap-2">
          <img src={chrono} alt="chrono" className="h-5 md:h-8" />
          <div className="flex items-center gap-2">
            {recipe.cooking_time !== null ? (
              <div className="flex items-center">
                <p className="text-lg">{recipe.cooking_time}</p>
                <button type="button" onClick={handleModifyCookingTime}>
                  <img src={modify} alt="modifier" className="w-8 mx-2" />
                </button>
              </div>
            ) : (
              <div className="bg-accent rounded-xl flex mx-1">
                <input
                  type="number"
                  name=""
                  min={0}
                  maxLength={3}
                  placeholder="00"
                  className="bg-accent ml-2 placeholder:text-base-content w-16 p-2  "
                  onChange={handleCreationTime}
                />
                <button
                  type="button"
                  className="mx-2 rounded-full"
                  onClick={handleAddCreationTime}
                >
                  <img
                    src={validation}
                    alt="valider"
                    className=" text-center w-8"
                  />
                </button>
              </div>
            )}
            <p className="text-center text-lg">min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

CookingDetails.propTypes = {
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
CookingDetails.defaultProps = {
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
export default CookingDetails;
