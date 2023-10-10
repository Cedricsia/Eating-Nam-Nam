import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import expressAPI from "../services/expressAPI";
import RecipeCards from "./RecipeCards";
import UserComment from "./UserComment";
import UserBadge from "./UserBadge";

function UserRecipeInfo({ selectedUser, setSelectedUser }) {
  const [userRecipes, setUserRecipes] = useState(null);

  useEffect(() => {
    expressAPI.get(`/recipes-by-user/${selectedUser.id}`).then((res) => {
      setUserRecipes(res.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center mb-3 mt-10 max-w-7xl mx-auto md:mx-2">
      {userRecipes && (
        <div className="flex flex-col items-center my-3">
          <div className="md:flex flex-row w-full">
            <h1 className="flex justify-center mx-3 text-center">
              Recettes de {selectedUser.pseudo}
            </h1>
          </div>

          <div className="my-3">
            {userRecipes.length !== 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3   ">
                {userRecipes.map((recipe) => (
                  <div key={recipe.id}>
                    <RecipeCards
                      id={recipe.id}
                      img={recipe.image}
                      title={recipe.name}
                      time={recipe.time}
                      userImg={recipe.user_img}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <p>{selectedUser.pseudo} n'a pas encore posté de recette</p>
              </div>
            )}
          </div>
          <div className="my-3 w-full">
            <UserComment user={selectedUser} />
          </div>
          <div className="w-full">
            <UserBadge selectedUser={selectedUser} />
          </div>
        </div>
      )}
      <div className="">
        <button
          type="button"
          className="btn btn-primary my-3 text-neutral"
          onClick={() => setSelectedUser(null)}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
UserRecipeInfo.propTypes = {
  selectedUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};

export default UserRecipeInfo;
