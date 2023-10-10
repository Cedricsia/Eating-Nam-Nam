import { useState } from "react";
import PropTypes from "prop-types";
import plat from "../../assets/plats.png";
import validation from "../../assets/icons/validation.png";
import modify from "../../assets/icons/modify.png";

function CookingHeader({ recipe, setRecipe, files, setFiles }) {
  const [recipeName, setRecipeName] = useState("");
  const handleAddName = (e) => {
    setRecipeName(e.target.value);
  };
  const handleName = () => {
    if (recipeName !== "") {
      setRecipe({ ...recipe, name: recipeName });
    }
  };
  const handleModifyName = () => {
    setRecipe({ ...recipe, name: "" });
  };

  return (
    <div className="flex flex-col md:flex md:flex-row md:justify-center">
      <div className="flex flex-col">
        {files.length ? (
          <img
            src={URL.createObjectURL(files[0])}
            className="h-64"
            alt="plat"
          />
        ) : (
          <img src={plat} alt="plat" className=" w-[30rem] md:h-64" />
        )}

        <input
          type="file"
          name=""
          id=""
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <div className="  m-3 flex justify-center md:mt-5 md:flex md:flex-col md:justify-start ">
        {recipe.name !== "" ? (
          <div className="flex items-center justify-center w-2/3 md:w-auto">
            <h1 className=" text-2xl md:text-3xl ">{recipe.name}</h1>{" "}
            <button type="button" onClick={handleModifyName}>
              <img src={modify} alt="crayon" className="w-10  md:ml-6" />
            </button>
          </div>
        ) : (
          <div className=" bg-accent rounded-3xl flex">
            <input
              value={recipeName}
              type="text"
              placeholder="Nom de la recette"
              className="bg-accent ml-3  placeholder:text-base-content h-10 "
              onChange={handleAddName}
            />
            <button
              type="button"
              className="mx-3 rounded-full"
              onClick={handleName}
            >
              <img
                src={validation}
                alt="valider"
                className="w-8 text-center "
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

CookingHeader.propTypes = {
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
  files: PropTypes.arrayOf(PropTypes.shape).isRequired,
  setFiles: PropTypes.func.isRequired,
};

CookingHeader.defaultProps = {
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

export default CookingHeader;
