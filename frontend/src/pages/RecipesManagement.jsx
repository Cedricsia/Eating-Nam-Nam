import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import LatestRecipeTable from "../components/LatestRecipeTable";

import loupe from "../assets/icons/loupe.png";
import ModfiRecipe from "./ModfiRecipe";
import ModalDeleteRecipe from "../components/modal/ModalDeleteRecipe";

function RecipesManagement() {
  const [recipes, setRecipes] = useState([]);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [recipeId, setRecipeId] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState("");

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/recipes`)
      .then((res) => setRecipes(res.data))
      .catch((error) => console.error(error));

    expressAPI
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((error) => console.error(error));

    if (isUpdated) {
      toast.success("Les modifications ont bien été prises en compte", {
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
    setIsUpdated(false);
  }, [isUpdated]);

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="bg-neutral">
      {user && (
        <>
          <UserBannerMobile user={user} />
          <div className="md:flex">
            <div className={recipeId === null ? `flex` : `hidden`}>
              <UserBannerDesktop user={user} />
            </div>
            {recipeId !== null ? (
              <div className="w-full  flex bg-neutral  justify-center">
                <ModfiRecipe recipeId={recipeId} setRecipeId={setRecipeId} />
              </div>
            ) : (
              <div className="w-full lg:ml-8">
                <h1 className="font-bold text-center md:text-left md:px-8 text-2xl lg:text-3xl pt-8 md:pt-14">
                  Rechercher une recette par nom ou par utilisateur
                </h1>
                <div className="bg-accent h-10 rounded-3xl flex items-center m-4 md:mx-8 md:my-8 md:w-80 xl:w-[40rem]">
                  <input
                    type="text"
                    value={value}
                    onChange={handleValue}
                    className="bg-accent ml-5 mb-1 w-full h-8 focus:outline-none focus:ring-0"
                  />
                  <div type="button" className="mx-3 rounded-full">
                    <img
                      src={loupe}
                      alt="Logo loupe"
                      className="w-8 text-center"
                    />
                  </div>
                </div>
                <div>
                  <h1 className="font-bold text-center md:text-left md:px-8 text-xl lg:text-2xl pt-8 md:pt-14">
                    Dernières recettes créées
                  </h1>
                  <div className="h-full mx-4 my-8 md:mr-12 md:ml-8 lg:ml-5">
                    <table className="table ">
                      <thead className=" ng-neutral text-lg text-base-content lg:text-xl">
                        <tr>
                          <th className="">Recette</th>
                          <th colSpan={2} className="">
                            Utilisateur
                          </th>
                        </tr>
                      </thead>
                      {recipes &&
                        recipes
                          .filter(
                            (recipe) =>
                              recipe.name
                                .toLocaleLowerCase()
                                .includes(value.toLocaleLowerCase()) ||
                              recipe.user_pseudo
                                .toLocaleLowerCase()
                                .includes(value.toLocaleLowerCase())
                          )

                          .sort((a, b) => b.id - a.id)
                          .map(
                            (recipe, index) =>
                              index < 20 && (
                                <LatestRecipeTable
                                  key={recipe.id}
                                  recipe={recipe}
                                  recipes={recipes}
                                  setRecipes={setRecipes}
                                  setRecipeId={setRecipeId}
                                  isUpdated={isUpdated}
                                  setIsUpdated={setIsUpdated}
                                  setRecipeToDelete={setRecipeToDelete}
                                />
                              )
                          )}
                    </table>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start py-12 md:ml-8 lg:ml-5">
                  <Link to="/create-recipe">
                    <button
                      type="button"
                      className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                    >
                      Créer une recette
                    </button>
                  </Link>
                </div>
                <ModalDeleteRecipe
                  recipeToDelete={recipeToDelete}
                  recipes={recipes}
                  setRecipes={setRecipes}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                />
              </div>
            )}
          </div>
          <ToastContainer theme="colored" />
        </>
      )}
    </div>
  );
}

export default RecipesManagement;
