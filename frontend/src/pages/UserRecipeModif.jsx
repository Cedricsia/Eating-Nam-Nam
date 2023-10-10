import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";

import ModfiRecipe from "./ModfiRecipe";
import expressAPI from "../services/expressAPI";

function UserRecipesModif() {
  const { recipeId } = useParams();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    expressAPI.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <UserBannerMobile user={user} />
          <div className="md:flex">
            <div className="hidden lg:flex">
              <UserBannerDesktop user={user} />
            </div>
            <div className="w-full  flex bg-neutral  justify-center">
              <ModfiRecipe recipeId={recipeId} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserRecipesModif;
