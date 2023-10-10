import React, { useState } from "react";
import PropTypes from "prop-types";
import plat from "../../assets/plats.png";
import validation from "../../assets/icons/validation.png";
import modify from "../../assets/icons/modify.png";

function RecipeHeader({ all, setAll, files, setFiles }) {
  const [recipeName, setRecipeName] = useState("");
  const handleAddName = (e) => {
    setRecipeName(e.target.value);
  };
  const handleName = () => {
    if (recipeName !== "") {
      setAll({ ...all, recipe: { ...all.recipe, name: recipeName } });
    }
  };
  const handleModifyName = () => {
    setAll({ ...all, recipe: { ...all.recipe, name: "" } });
  };

  return (
    <div className="flex flex-col xl:flex xl:flex-row lg:justify-center">
      <div className="flex  flex-col  ">
        {all.recipe.image ? (
          <div>
            {files.length ? (
              <img
                src={URL.createObjectURL(files[0])}
                className="h-64 mx-1 rounded-xl"
                alt="plat"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/recipes/${
                  all.recipe.image
                }`}
                alt="plat"
                className="w-[30rem] md:h64 rounded-xl"
              />
            )}
          </div>
        ) : (
          <div>
            {files.length ? (
              <img
                src={URL.createObjectURL(files[0])}
                className="w-[30rem]"
                alt="plat"
              />
            ) : (
              <img src={plat} alt="plat" className="w-56" />
            )}
          </div>
        )}
        <input
          type="file"
          name=""
          id=""
          className="m-2"
          onChange={(e) => setFiles(e.target.files)}
        />
      </div>
      <div className="  m-3 flex justify-center md:mt-5 md:flex md:flex-col md:justify-start ">
        {all.recipe.name !== "" ? (
          <div className="flex items-center gap-4 justify-center w-2/3 md:w-auto">
            <h1 className="mt-8 md:mt-0 text-2xl md:text-3xl ">
              {all.recipe.name}
            </h1>{" "}
            <button type="button" onClick={handleModifyName}>
              <img
                src={modify}
                alt="crayon"
                className="w-10 mt-8 md:mt-0 md:ml-6"
              />
            </button>
          </div>
        ) : (
          <div className=" flex flex-row justify-center">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeHeader;
RecipeHeader.propTypes = {
  all: PropTypes.shape({
    recipe: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
  files: PropTypes.instanceOf(FileList).isRequired,
  setFiles: PropTypes.func.isRequired,
};
