import React, { useState } from "react";
import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

import loupe from "../../assets/icons/loupe.png";
import validation from "../../assets/icons/validation.png";
import trash from "../../assets/icons/trash.png";
import modify from "../../assets/icons/modify.png";
import ModalCreationIng from "../CreationRecipe/ModalCreationIng";

function ModalIngredient({ all, setAll }) {
  const [toggle, setTogle] = useState(true);

  const [ingQuantity, setIngQuantity] = useState(null);
  const [searchIng, setSearchIng] = useState("");
  const [ingResult, setIngResult] = useState(null);

  const handleModify = (elem) => {
    const newIngArray = all.ingredients.map((ing) => {
      if (ing.name === elem.name) {
        return { ...ing, quantity: 0 };
      }
      return ing;
    });

    setAll({ ...all, ingredients: newIngArray });
    setTogle(false);
  };

  const handledelete = (elem) => {
    const newIngArray = [...all.ingredients];
    newIngArray.forEach((ing, index) => {
      if (ing.id === elem.id) {
        newIngArray.splice(index, 1);
        setAll({ ...all, ingredients: newIngArray });
      }
    });
  };

  const handleValid = (elem) => {
    const newIngArray = all.ingredients.map((ing) => {
      if (ing.name === elem.name) {
        return { ...ing, quantity: parseInt(ingQuantity, 10) };
      }
      return ing;
    });

    setAll({ ...all, ingredients: newIngArray });
    setTogle(true);
  };

  const handleQuantityChange = (e) => {
    setIngQuantity(e.target.value);
  };

  const handleAddIng = (elem) => {
    const newIng = {
      ...elem,
      name: elem.name,
      quantity: 0,
      unit: elem.unit,
      ingredient_id: elem.id,
    };

    const newArrayIng = [...all.ingredients];
    newArrayIng.push(newIng);
    setAll({ ...all, ingredients: newArrayIng });
    setIngResult(null);
    setTogle(false);
  };
  const handleValidateIng = () => {
    window.ing.close();
  };

  const handleIng = () => {
    if (searchIng !== "") {
      expressAPI
        .get(`${import.meta.env.VITE_BACKEND_URL}/ing?name=${searchIng}`)
        .then((res) => setIngResult(res.data));
    }
  };

  return (
    <div>
      <div id="modal">
        <dialog id="ing" className="modal ">
          <div method="dialog" className="modal-box bg-neutral   ">
            <h3 className="font-bold text-lg text-center md:text-2xl">
              Ingrédients
            </h3>
            <div className="md:text-xl">
              {all.ingredients &&
                all.ingredients.map((elem) => (
                  <div key={elem.id} className="flex items-center">
                    <p className="mx-2">{elem.name} :</p>
                    {elem.quantity !== 0 ? (
                      <p className="ml-3">{elem.quantity}</p>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        className="bg-accent mx-2  w-14 h-10"
                        onChange={handleQuantityChange}
                      />
                    )}

                    <p>{elem.unit}</p>
                    <div>
                      {elem.quantity !== 0 ? (
                        <button
                          type="button"
                          onClick={() => handleModify(elem)}
                          className="mx-1"
                        >
                          <img src={modify} alt="modifier" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleValid(elem)}
                          className="mx-1"
                        >
                          <img src={validation} alt="valider" />
                        </button>
                      )}
                    </div>
                    <div>
                      <button type="button" onClick={() => handledelete(elem)}>
                        <img
                          src={trash}
                          alt="corbeille"
                          className="w-10 mx-1 "
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {toggle && (
              <div id="Recherche" className="flex gap-3">
                <input
                  type="text"
                  id=""
                  className="bg-accent p-2 my-3 w-full h-10"
                  onChange={(e) => setSearchIng(e.target.value)}
                />
                <button type="button" onClick={handleIng}>
                  <img src={loupe} alt="" />
                </button>
              </div>
            )}
            {ingResult !== null && (
              <div>
                <div
                  id="affichage de la recherche"
                  className="flex  flex-row flex-wrap"
                >
                  {ingResult.map((elem) => (
                    <div key={elem.id}>
                      <div key={elem.id}>
                        <button
                          type="button"
                          className="mx-1 bg-accent rounded-xl p-2 m-1"
                          onClick={() => handleAddIng(elem)}
                        >
                          {elem.name}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-5 mb-3">
                  <h1>Vous ne trouvez pas votre ingrédient ?</h1>
                  <button
                    type="button"
                    className="btn bg-primary text-accent border-0 m-3"
                    onClick={() => window.ingCreation.showModal()}
                  >
                    creer un ingredient
                  </button>
                </div>
              </div>
            )}
            <div className="modal-action">
              {toggle && (
                <div>
                  <button
                    type="button"
                    className="btn bg-secondary text-accent border-0 m-2 "
                    onClick={handleValidateIng}
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

export default ModalIngredient;
ModalIngredient.propTypes = {
  all: PropTypes.shape({
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      })
    ).isRequired,
    recipe: PropTypes.shape({
      nutrition: PropTypes.shape({
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        sugar: PropTypes.number.isRequired,
        energy: PropTypes.number.isRequired,
        fiber: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};
