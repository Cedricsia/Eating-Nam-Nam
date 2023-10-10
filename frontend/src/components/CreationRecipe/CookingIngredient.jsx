import { useState } from "react";
import PropTypes from "prop-types";
import btnw from "../../assets/icons/plus_reverse.png";
import loupe from "../../assets/icons/loupe.png";
import validation from "../../assets/icons/validation.png";
import trash from "../../assets/icons/trash.png";
import modify from "../../assets/icons/modify.png";
import ModalCreationIng from "./ModalCreationIng";
import sumNutrition from "../../services/sumNutrition";

import expressAPI from "../../services/expressAPI";

function CookingIngredient({ recipe, setRecipe, setIngredient }) {
  const [ingSelect, setIngselect] = useState([]);
  const [toggle, setTogle] = useState(true);
  const [unit, setUnit] = useState("");
  const [searchIng, setSearchIng] = useState("");
  const [input, setInput] = useState(null);

  const handleModal = () => {
    document.getElementById("ingSearch").showModal();
  };

  const handleValidIng = () => {
    const quantity = "quantity";
    const recipeID = "recipe_id";
    const ings = "ingredient_id";
    const ingredients = ingSelect.map((ing) => ({
      [quantity]: ing.quantity,
      [recipeID]: 1,
      [ings]: ing.id,
    }));
    setIngredient(ingredients);

    const nutrionTotal = sumNutrition(ingSelect);

    setRecipe({
      ...recipe,
      nutrition: nutrionTotal,
    });
    document.getElementById("ingSearch").close();
  };

  const handleUnit = (e) => {
    setUnit(e.target.value);
  };
  const handleSearch = (e) => {
    setSearchIng(e.target.value);
  };

  const handleReq = (elem) => {
    const newIngSelect = [...ingSelect];
    const key1 = "quantity";
    const key2 = "validate";
    newIngSelect.forEach((ing) => {
      if (ing.id === elem.id) {
        const ingredient = ing;
        ingredient[key1] = parseInt(unit, 10);
        ingredient[key2] = true;
        setIngselect(newIngSelect);
        setTogle(true);
      }
    });
  };
  const handleModify = (elem) => {
    const newIngSelect = [...ingSelect];
    const key = "validate";
    newIngSelect.forEach((ing) => {
      if (ing.id === elem.id) {
        const ingredient = ing;
        ingredient[key] = false;
        setIngselect(newIngSelect);
        setTogle(false);
      }
    });
  };

  const handleselect = (elem) => {
    const newElem = { ...elem, validate: false };
    const newArray = [...ingSelect];
    setIngselect([...newArray, newElem]);
    setInput(null);
    setTogle(false);
  };

  const handledelete = (elem) => {
    const newIngSelect = [...ingSelect];
    ingSelect.forEach((ing, index) => {
      if (ing.id === elem.id) {
        newIngSelect.splice(index, 1);
        setIngselect(newIngSelect);
      }
    });
  };

  const handleIng = () => {
    if (searchIng !== "") {
      expressAPI
        .get(`/ing?name=${searchIng}`)
        .then((res) => setInput(res.data));
    }
  };

  return (
    <div>
      <div>
        <h2 className="mt-10 mb-5 ml-7 text-xl">Ingrédients</h2>
        {ingSelect.length > 0 ? (
          <ul className="list-disc list-inside ml-7 md:text-lg md:pr-2">
            {ingSelect.map((ing) => (
              <li key={ing.id}>
                {ing.quantity} {ing.unit} {ing.name}
              </li>
            ))}
            <div className="flex  justify-center">
              <button
                type="button"
                onClick={handleModal}
                className="btn btn-primary text-accent mt-3 px-3 items-center "
              >
                Modifier
              </button>
            </div>
          </ul>
        ) : (
          <div className="bg-accent w rounded-2xl h-52 flex justify-center items-center mx-8">
            <div className="flex  flex-col  items-center">
              <button
                type="button"
                className="text-center"
                onClick={handleModal}
              >
                <img src={btnw} alt="ajouter" />
              </button>
              <p className="px-1 text-center mt-4">Ajouter les ingrédients</p>
            </div>
          </div>
        )}
      </div>
      <div id="modal">
        <dialog id="ingSearch" className="modal ">
          <div method="dialog" className="modal-box bg-neutral   ">
            <h3 className="font-bold text-lg text-center md:text-2xl">
              Ingrédients
            </h3>
            <div className="md:text-xl">
              {ingSelect &&
                ingSelect.map((elem) => (
                  <div key={elem.id} className="flex items-center">
                    <p className="mx-2">{elem.name} :</p>
                    {elem.quantity && elem.validate ? (
                      <p className="ml-3">{elem.quantity}</p>
                    ) : (
                      <input
                        type="number"
                        className="bg-accent mx-2  w-14 h-10"
                        onChange={handleUnit}
                        readOnly={elem.validate}
                      />
                    )}

                    <p>{elem.unit}</p>

                    <div>
                      {elem.validate ? (
                        <button
                          type="button"
                          onClick={() => handleModify(elem)}
                          className="mx-1  "
                        >
                          <img src={modify} alt="modifier" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReq(elem)}
                          className="mx-1 rounded-full border"
                        >
                          <img src={validation} alt="valider" />
                        </button>
                      )}
                    </div>
                    <div>
                      {elem.validate && (
                        <button
                          type="button"
                          onClick={() => handledelete(elem)}
                        >
                          <img
                            src={trash}
                            alt="corbeille"
                            className="w-10 mx-1 "
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {toggle && (
              <div id="Recherche" className="flex items-center gap-3">
                <input
                  type="text"
                  id=""
                  className="bg-accent pl-2 my-3 w-10/12 h-10"
                  onChange={handleSearch}
                />
                <button type="button" onClick={handleIng} className=" ">
                  <img src={loupe} alt="" />
                </button>
              </div>
            )}
            {input !== null && (
              <div>
                <div
                  id="affichage de la recherche"
                  className="flex  flex-row flex-wrap"
                >
                  {input.map((elem) => (
                    <div key={elem.id}>
                      <div key={elem.id}>
                        <button
                          type="button"
                          className="mx-1 bg-accent rounded-xl p-2 m-1"
                          onClick={() => handleselect(elem)}
                        >
                          {elem.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center my-10">
                  <h1>Vous ne trouvez pas votre ingrédient ?</h1>
                  <button
                    type="button"
                    className="btn bg-primary text-accent border-0 my-5 "
                    onClick={() =>
                      document.getElementById("ingCreation").showModal()
                    }
                  >
                    Créer un ingredient
                  </button>
                </div>
              </div>
            )}
            <div className="modal-action">
              {toggle && (
                <div>
                  <button
                    type="button"
                    className="btn bg-secondary  text-accent border-0 "
                    onClick={handleValidIng}
                  >
                    Valider les ingrédients
                  </button>
                </div>
              )}
            </div>
            <div>
              <ModalCreationIng />
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}

CookingIngredient.propTypes = {
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
  setIngredient: PropTypes.func.isRequired,
};
CookingIngredient.defaultProps = {
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
export default CookingIngredient;
