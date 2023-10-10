import { useState } from "react";
import PropTypes from "prop-types";

import validation from "../../assets/icons/validation.png";
import difficultyPicture from "../../assets/images/biceps.png";
import chrono from "../../assets/images/stopwatch.png";
import mortar from "../../assets/images/mortar.png";
import modify from "../../assets/icons/modify.png";

function RecipeDetails({ all, setAll }) {
  const [cookingTime, setCookingTime] = useState(null);
  const [time, setTime] = useState(null);
  const handleRecipeDifficulty = (e) => {
    setAll({ ...all, recipe: { ...all.recipe, difficulty: e.target.value } });
  };
  const handleAddCreationTime = () => {
    setAll({
      ...all,
      recipe: { ...all.recipe, cooking_time: parseInt(cookingTime, 10) },
    });
  };
  const handleCreationTime = (e) => {
    setCookingTime(e.target.value);
  };
  const handleAddTime = () => {
    setAll({
      ...all,
      recipe: { ...all.recipe, time: parseInt(time, 10) },
    });
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleModifyTime = () => {
    setAll({
      ...all,
      recipe: { ...all.recipe, time: null },
    });
  };

  const handleModifyCookingTime = () => {
    const newRecipe = {
      ...all,
      recipe: {
        ...all.recipe,
      },
    };
    newRecipe.recipe.cooking_time = null;
    setAll(newRecipe);
  };
  return (
    <div className="md:flex md:flex-row md:justify-around  flex flex-col gap-3  m-5">
      <div className="col-span-1 ">
        <div>
          <h2 className="hidden md:flex md:mb-2">Temps total</h2>
          <div className="flex md:justify-center items-center gap-2 ">
            <img src={mortar} alt="chrono" className="h-5 md:h-8" />
            <div className="flex items-center gap-2 md:text-xl">
              {all.recipe.time !== null ? (
                <div className="flex items-center ">
                  <div>{all.recipe.time}</div>
                  <button
                    type="button"
                    className="mx-1"
                    onClick={handleModifyTime}
                  >
                    <img src={modify} alt="modifier" className="h-5 md:h-8" />
                  </button>
                </div>
              ) : (
                <div className="bg-accent rounded-xl flex">
                  <input
                    type="number"
                    name=""
                    min={0}
                    maxLength={3}
                    placeholder="00"
                    className="bg-accent ml-2 placeholder:text-base-content w-8 md:w-16 md:p-2 "
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
                      className="w-5 md:w-8 text-center "
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
        <div className="flex md:justify-center items-center gap-2 md:text-xl">
          <img src={difficultyPicture} alt="chrono" className="h-5 md:h-8" />
          <select
            name="difficulty"
            onChange={handleRecipeDifficulty}
            className="md:w-32 bg-accent items-center rounded-xl p-2"
          >
            <option value="" className="">
              {all.recipe.difficulty}
            </option>
            <option value="Facile">Facile</option>
            <option value="Moyen">Moyen</option>
            <option value="Difficile">Difficile</option>
          </select>
        </div>
      </div>
      <div className="col-span-1 ">
        <h2 className="hidden md:flex md:mb-2">Préparation</h2>
        <div className="flex md:justify-center items-center gap-2 md:text-xl">
          <img src={chrono} alt="chrono" className="h-5 md:h-8" />
          <div className="flex items-center gap-2">
            {all.recipe.cooking_time !== null ? (
              <div className="flex items-center">
                <div>{all.recipe.cooking_time}</div>
                <button type="button" onClick={handleModifyCookingTime}>
                  <img src={modify} alt="modifier" className="w-8" />
                </button>
              </div>
            ) : (
              <div className="bg-accent rounded-xl flex">
                <input
                  type="number"
                  name=""
                  min={0}
                  maxLength={3}
                  placeholder="00"
                  className="bg-accent ml-2 placeholder:text-base-content w-8 md:w-16 md:p-2 "
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
                    className="w-5 md:w-8 text-center "
                  />
                </button>
              </div>
            )}
            <p className="text-center">min</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
RecipeDetails.propTypes = {
  all: PropTypes.shape({
    recipe: PropTypes.shape({
      difficulty: PropTypes.string,
      time: PropTypes.number,
      cooking_time: PropTypes.number,
    }),
  }),
  setAll: PropTypes.func.isRequired,
};

RecipeDetails.defaultProps = {
  all: null,
};
