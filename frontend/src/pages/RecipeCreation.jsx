import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import CookingHeader from "../components/CreationRecipe/CookingHeader";
import CookingDetails from "../components/CreationRecipe/CookingDetails";
import CookingStep from "../components/CreationRecipe/CookingStep";
import CookingIngredient from "../components/CreationRecipe/CookingIngredient";
import CookingLabels from "../components/CreationRecipe/CookingLabels";
import Portions from "../components/CreationRecipe/Portions";
import expressAPI from "../services/expressAPI";

function RecipeCreation() {
  const [files, setFiles] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [req, setReq] = useState({});
  const [ingredient, setIngredient] = useState({});
  const [isFullfilled, setIsFullFilled] = useState(false);
  const [recipe, setRecipe] = useState({
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
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { id } = user;

    setRecipe({ ...recipe, user_id: id });
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const formData = new FormData();
    formData.append("recipe", JSON.stringify(req.recipe));
    formData.append("ingredients", JSON.stringify(req.ingredients));
    formData.append("labels", JSON.stringify(req.labels));
    formData.append("file", files[0]);

    if (isFullfilled) {
      expressAPI
        .post(`/recipes`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          toast.success("Recette créée", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
          navigate(`/recipes/${res.data.id}`);
        })
        .catch((error) => {
          toast.error(error.response.data);
        });
    }
    setIsFullFilled(false);
  }, [req, isFullfilled]);

  const submit = () => {
    if (Object.keys(ingredient).length !== 0) {
      const nutrition = {};
      Object.keys(recipe.nutrition).forEach((key) => {
        const value = recipe.nutrition[key] / recipe.initial_portion;
        nutrition[key] = parseFloat(value.toFixed(2));
      });

      const recipeId = "recipe_id";
      const labelID = "label_id";
      const id = 0;

      const labels = selectedLabels.map((elem) => ({
        [recipeId]: parseInt(id, 10),
        [labelID]: elem.id,
      }));

      const ingredients = ingredient.map((ing) => ({
        ...ing,
        quantity: parseInt(ing.quantity / recipe.initial_portion, 10),
      }));
      setReq({ ...req, ingredients, labels, recipe: { ...recipe, nutrition } });

      setIsFullFilled(true);
    } else {
      toast.error("Veuillez remplir ou valider tous les champs ", {
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
  };
  useEffect(() => {
    const id = parseInt(localStorage.getItem("user"), 10);

    setRecipe({ ...recipe, user_id: id });
  }, []);

  return (
    <div className="bg-neutral flex justify-center  ">
      <div className="md:pt-10 bg-neutral flex flex-col max-w-7xl ">
        <CookingHeader
          recipe={recipe}
          setRecipe={setRecipe}
          files={files}
          setFiles={setFiles}
        />
        <div className="md:border-base-content md:border-y md:mt-12 ">
          <CookingDetails recipe={recipe} setRecipe={setRecipe} />
        </div>
        <Portions recipe={recipe} setRecipe={setRecipe} />
        <div className="flex flex-col justify-around  ml-2 md:flex md:flex-row md:justify-center   md:gap-10 ">
          <div className="md:w-1/3">
            <CookingIngredient
              recipe={recipe}
              setRecipe={setRecipe}
              ingredient={ingredient}
              setIngredient={setIngredient}
            />
            <div className="hidden">
              <CookingLabels
                selectedLabels={selectedLabels}
                setSelectedLabels={setSelectedLabels}
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <CookingStep recipe={recipe} setRecipe={setRecipe} />
          </div>
        </div>
        <div className="">
          <CookingLabels
            selectedLabels={selectedLabels}
            setSelectedLabels={setSelectedLabels}
          />
        </div>
        <div className="flex justify-center m-5">
          <button
            type="button"
            className="btn btn-primary text-neutral"
            onClick={submit}
          >
            Ajouter ma recette
          </button>
          <ToastContainer theme="colored" />
        </div>
      </div>
    </div>
  );
}

export default RecipeCreation;
