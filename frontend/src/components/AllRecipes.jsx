import { useEffect, useState } from "react";
import loupe from "../assets/icons/loupe.png";
import RecipeCards from "./RecipeCards";

import expressAPI from "../services/expressAPI";

function AllRecipes() {
  const [tagRecipe, setTagRecipe] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [favRecipes, setFavRecipes] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    expressAPI
      .get(`/label`)
      .then((res) => setTagRecipe(res.data))
      .catch((error) => console.error("Le fecth label  a echoué:", error));
  }, []);

  useEffect(() => {
    expressAPI
      .get(`/recipes`)
      .then((res) => setRecipes(res.data))
      .catch((error) => console.error("Le fecth recipes a échoué:", error));
  }, []);

  const userId = localStorage.getItem("user");

  useEffect(() => {
    expressAPI
      .get(`/recipes-favourite-user/${userId}`)
      .then((res) => setFavRecipes(res.data))
      .catch((error) => console.error("Le fecth recipes a échoué:", error));
  }, []);

  const handleValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleFilterClick = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((activeTag) => activeTag !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  const filterRecipes = () => {
    if (activeTags.length === 0) {
      return isFavourite ? favRecipes : recipes;
    }
    return (isFavourite ? favRecipes : recipes).filter((recipeItem) => {
      const recipeTags = recipeItem.labelName.split(",");
      return recipeTags.some((tag) =>
        activeTags.some((label) => label.name === tag)
      );
    });
  };

  return (
    <div className="bg-neutral md:min-h-screen">
      <div className="bg-banniere-sm bg-cover box-content md:bg-banniere-md w-screen h-80 text-5xl text-black  flex items-center justify-center">
        <div className="bg-gray-800 bg-opacity-40 px-10 py-6 rounded-xl">
          <p className="opacity-100 text-neutral">Les recettes</p>
        </div>
      </div>
      <div className="flex justify-around items-center mb-3 pl-2 pr-2 bg-secondary font-medium">
        <button
          type="button"
          className="h-10 text-white mr-2 flex justify-around items-center flex-wrap"
          onClick={() => document.getElementById("modal_tag").showModal()}
        >
          Filtres
        </button>
        <dialog id="modal_tag" className="modal">
          <form method="dialog" className="modal-box bg-neutral-100">
            <h3 className="font-bold text-lg text-center">Une préférence ?</h3>
            <p className="py-4 flex flex-wrap justify-around">
              {tagRecipe
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    className={`object-contain h-10 w-28 bg-secondary rounded-2xl m-3  ${
                      activeTags.includes(tag) ? "opacity-100" : "opacity-30"
                    }`}
                    onClick={() => handleFilterClick(tag)}
                  >
                    {tag.name}
                  </button>
                ))}
            </p>
            <div className="modal-action flex justify-center ">
              <button type="submit" className="btn text-neutral bg-primary">
                Valider
              </button>
            </div>
          </form>
        </dialog>
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleValue}
            className="w-[12rem] bg-white rounded-2xl pl-3 pr-5"
          />
          <button
            type="button"
            className="absolute right-2 bg-white flex w-[1.4rem] justify-center items-center rounded-2xl p-1 "
          >
            <img src={loupe} alt="loupe" />
          </button>
        </div>

        <div className="form-control flex justify-center items-center border-none bg-white lg:bg-secondary">
          <label className="cursor-pointer label bg-secondary p-2 ">
            <span className="label-text text-white font-bold pr-2">
              Favoris{" "}
            </span>
            <input
              type="checkbox"
              className="checkbox bg-secondary checkbox-primary"
              onClick={() => setIsFavourite(!isFavourite)}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {tagRecipe
          .filter((tag) => activeTags.includes(tag))
          .map((tag) => (
            <span
              className="h-10 w-28 bg-secondary rounded-2xl m-3 text-center flex justify-center items-center"
              key={tag.id}
            >
              {tag.name}
            </span>
          ))}
      </div>
      <div className=" ">
        <div className="grid grid-cols-2 md:flex md:justify-center md:flex-wrap">
          {filterRecipes()
            .filter((recipeItem) =>
              recipeItem.name
                .toLocaleLowerCase()
                .includes(inputValue.toLocaleLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((recipeItem) => (
              <div key={recipeItem.id} className="m-3">
                <RecipeCards
                  id={recipeItem.id}
                  img={recipeItem.image}
                  userImg={recipeItem.user_img}
                  title={recipeItem.name}
                  time={recipeItem.time}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AllRecipes;
