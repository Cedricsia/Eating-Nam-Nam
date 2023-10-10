import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import RecipeHeader from "../components/ModifRecipe/RecipeHeader";
import RecipeDetails from "../components/ModifRecipe/RecipeDetails";
import RecipeIngredient from "../components/ModifRecipe/RecipeIngredient";
import RecipeStep from "../components/ModifRecipe/RecipeStep";
import RecipeLabel from "../components/ModifRecipe/RecipeLabel";
import RecipePortions from "../components/ModifRecipe/RecipePortions";
import sumNutrition from "../services/sumNutrition";
import expressAPI from "../services/expressAPI";
import "react-toastify/dist/ReactToastify.css";

function ModfiRecipe({ recipeId, setRecipeId }) {
  const [all, setAll] = useState(null);
  const [req, setReq] = useState({});
  const [validate, setValidate] = useState(false);
  const [files, setFiles] = useState([]);

  const location = useLocation();

  const navigate = useNavigate();

  const handleReq = () => {
    const newReq = { ...all };
    const ingredientsReq = newReq.ingredients.map((elem) => ({
      proteins: elem.proteins,
      fat: elem.fat,
      sugar: elem.sugar,
      energy: elem.energy,
      fiber: elem.fiber,
      quantity: parseInt(elem.quantity / all.recipe.initial_portion, 10),
      recipe_id: all.recipe.id,
      ingredient_id: elem.id,
    }));
    const nutritionTotal = sumNutrition(ingredientsReq);
    const ingFinal = ingredientsReq.map((ing) => ({
      quantity: ing.quantity,
      recipe_id: ing.recipe_id,
      ingredient_id: ing.ingredient_id,
    }));

    const newRecip = {
      ...all.recipe,
      id: recipeId,
      nutrition: nutritionTotal,
    };

    const labelsReq = newReq.labels.map((elem) => ({
      label_id: elem.id,
      recipe_id: all.recipe.id,
    }));

    setReq({
      recipe: newRecip,
      ingredients: ingFinal,
      labels: labelsReq,
    });
    setValidate(true);
  };

  useEffect(() => {
    if (validate) {
      if (location.pathname.startsWith("/user/recipes-management")) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(req));
        formData.append("file", files[0]);

        expressAPI
          .put(`/admin/recipes/${recipeId}`, formData)
          .then(() => {
            toast.success("Recette modifiée");
            setRecipeId(null);
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
      } else {
        const formData = new FormData();
        formData.append("data", JSON.stringify(req));
        formData.append("file", files[0]);

        expressAPI
          .put(
            `/recipes/${recipeId}
      `,
            formData
          )
          .then(() => {
            toast.success("Recette modifiée");
            navigate(`/recipes/${all.recipe.id}`);
          })
          .catch((error) => {
            toast.error(error.response.data);
          });
      }
    }
    setValidate(false);
  }, [validate]);

  useEffect(() => {
    expressAPI.get(`/allFromRecipe/${recipeId}`).then((res) => {
      const { ingredients, labels, recipe } = res.data;

      const transformedIngredients = ingredients.map((ing) => ({
        ...ing,
        quantity: ing.quantity * recipe.initial_portion,
      }));

      const transformedLabels = labels.map((label) => ({
        ...label,
        recipe_id: recipe.id,
      }));

      setAll({
        ...res.data,
        ingredients: transformedIngredients,
        labels: transformedLabels,
      });
    });
  }, []);

  return (
    <div className="w-full max-w-7xl flex flex-col ">
      <h1 className="mt-10 md:mt-10 mb-10 md:mb-5 md:ml-5 text-center md:text-left ">
        Modifier ma recette :
      </h1>
      {all && (
        <div className="md:pt-10 bg-neutral md:ml-2   ">
          <RecipeHeader
            all={all}
            setAll={setAll}
            files={files}
            setFiles={setFiles}
          />
          <div className="md:border-base-content md:border-y md:mt-12">
            <RecipeDetails all={all} setAll={setAll} />
          </div>
          <RecipePortions all={all} setAll={setAll} />
          <div className="flex flex-col justify-around  ml-2 md:flex md:flex-row    md:gap-10 ">
            <div className="md:w-1/3">
              <RecipeIngredient all={all} setAll={setAll} />
              <div className="hidden ">
                <RecipeLabel all={all} setAll={setAll} />
              </div>
            </div>
            <div className="">
              <RecipeStep all={all} setAll={setAll} />
            </div>
          </div>
          <div className="">
            <RecipeLabel all={all} setAll={setAll} />
          </div>
          <div className="flex justify-center m-5">
            <button
              type="button"
              className="btn btn-primary text-neutral"
              onClick={handleReq}
            >
              Modifier la recette
            </button>
          </div>
        </div>
      )}
      <ToastContainer theme="colored" />
    </div>
  );
}

export default ModfiRecipe;
ModfiRecipe.propTypes = {
  recipeId: PropTypes.number.isRequired,
  setRecipeId: PropTypes.func.isRequired,
};
