import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";
import Recipe from "../pages/Recipe";
import Recipes from "../pages/Recipes";
import RecipeCreation from "../pages/RecipeCreation";
import User from "../pages/User";
import UserInfo from "../pages/UserInfo";
import UserRecipes from "../pages/UserRecipes";
import GeneralConditions from "../pages/GeneralConditions";
import About from "../pages/About";
import RecipesManagement from "../pages/RecipesManagement";
import IngredientsManagement from "../pages/IngredientsManagement";
import MostPopularRecipe from "../pages/MostPopularRecipe";
import UserRecipesModif from "../pages/UserRecipeModif";
import UsersManagement from "../pages/UsersManagement";
import SearchUser from "../pages/SearchUser";
import CommentsManagement from "../pages/CommentManagement";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/most-popular-recipe/:id" element={<MostPopularRecipe />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/create-recipe" element={<RecipeCreation />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/user/infos/:id" element={<UserInfo />} />
      <Route path="/user/recipes/:id" element={<UserRecipes />} />
      <Route path="/general-conditions" element={<GeneralConditions />} />
      <Route path="/about" element={<About />} />
      <Route path="/user/search-user" element={<SearchUser />} />
      <Route
        path="/user/recipes-management/:id"
        element={<RecipesManagement />}
      />
      <Route
        path="/user/recipes/:id/:recipeId"
        element={<UserRecipesModif />}
      />
      <Route
        path="/user/ing-management/:id"
        element={<IngredientsManagement />}
      />
      <Route path="/user/users-management/:id" element={<UsersManagement />} />
      <Route
        path="/user/comments-management/:id"
        element={<CommentsManagement />}
      />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default AppRoutes;
