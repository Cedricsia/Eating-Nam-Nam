import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import LatestIngredientTable from "../components/LatestIngredientTable";
import ModalCreationIng from "../components/CreationRecipe/ModalCreationIng";
import ModalUpdateIng from "../components/modal/ModalUpdateIng";
import DeleteIngredient from "../components/modal/DeleteIngredient";

import loupe from "../assets/icons/loupe.png";

function IngredientsManagement() {
  const [ingredients, setIngredients] = useState([]);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [ingredientToUpdate, setIngredientToUpdate] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [ingredientToDelete, setIngredientToDelete] = useState("");

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/ingredient`)
      .then((res) => setIngredients(res.data))
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
            <UserBannerDesktop user={user} />
            <div className="w-full lg:ml-8">
              <h1 className="font-bold text-center md:text-left md:px-8 text-2xl lg:text-3xl pt-8 md:pt-14">
                Rechercher un ingrédient
              </h1>
              <div className="bg-accent h-10 rounded-3xl flex items-center m-4 md:mx-4 md:my-8 md:w-80 xl:w-[40rem]">
                <input
                  type="text"
                  value={value}
                  onChange={handleValue}
                  className="bg-accent ml-5 mb-1 w-full h-8 focus:outline-none focus:ring-0  menu dropdown-end"
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
                  Derniers ingrédients créés
                </h1>
                <div className=" mx-4 my-8 md:mr-12 md:ml-8 lg:ml-5 h-full">
                  <table className="table ">
                    <thead className=" text-lg text-base-content md:text-xl">
                      <tr>
                        <th className="">Ingrédient</th>
                        <th className="w-16 xl:w-44"> </th>
                      </tr>
                    </thead>
                    {ingredients &&
                      ingredients
                        .filter((ingredient) =>
                          ingredient.name
                            .toLocaleLowerCase()
                            .includes(value.toLocaleLowerCase())
                        )
                        .sort((a, b) => b.id - a.id)
                        .map(
                          (ingredient, index) =>
                            index < 20 && (
                              <LatestIngredientTable
                                key={ingredient.id}
                                ingredientToUpdate={ingredientToUpdate}
                                setIngredientToUpdate={setIngredientToUpdate}
                                ingredient={ingredient}
                                isUpdated={isUpdated}
                                setIsUpdated={setIsUpdated}
                                setIngredientToDelete={setIngredientToDelete}
                              />
                            )
                        )}
                  </table>
                </div>
              </div>
              <div className="flex justify-center md:justify-between py-12 md:ml-8 md:mr-12 lg:ml-5">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("ingCreation").showModal()
                  }
                  className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                >
                  Créer un ingrédient
                </button>
              </div>
            </div>
            <ModalCreationIng />
            <ModalUpdateIng
              ingredientToUpdate={ingredientToUpdate}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
            />
            <DeleteIngredient
              ingredientToDelete={ingredientToDelete}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
              ingredients={ingredients}
              setIngredients={setIngredients}
            />
          </div>
          <ToastContainer theme="colored" />
        </>
      )}
    </div>
  );
}

export default IngredientsManagement;
