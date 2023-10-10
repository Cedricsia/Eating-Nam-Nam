import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import RecipeCards from "../components/RecipeCards";

import loupe from "../assets/icons/loupe.png";
import plus from "../assets/icons/plus.png";

function UserRecipes() {
  const [user, setUser] = useState(null);
  const [userRecipes, setUserRecipes] = useState(null);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    expressAPI.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });

    expressAPI.get(`/recipes-by-user/${id}`).then((res) => {
      setUserRecipes(res.data);
    });
  }, []);

  return (
    <div className="bg-neutral">
      {user && (
        <>
          <UserBannerMobile user={user} />
          <div className="md:flex">
            <UserBannerDesktop user={user} />
            <div className="flex flex-col items-center max-w-7xl w-full  mb-5">
              <h1 className="font-bold text-center md:text-left md:pl-8 text-2xl md:text-4xl pt-8 md:pt-14">
                Mes recettes
              </h1>
              <div className="bg-accent h-10 rounded-3xl flex items-center m-4 md:mx-4 md:my-8 md:w-80">
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
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3  w-full ">
                {userRecipes &&
                  userRecipes
                    .filter((userRecipe) =>
                      userRecipe.name
                        .toLocaleLowerCase()
                        .includes(value.toLocaleLowerCase())
                    )
                    .map((userRecipe) => (
                      <div key={userRecipe.id} className="flex flex-col ">
                        <RecipeCards
                          id={userRecipe.id}
                          img={userRecipe.image}
                          title={userRecipe.name}
                          time={userRecipe.time}
                          userImg={userRecipe.user_img}
                        />
                        <div className="flex justify-center mt-2">
                          <button
                            type="button"
                            className="btn btn-primary text-neutral"
                            onClick={() =>
                              navigate(`/user/recipes/${id}/${userRecipe.id}`)
                            }
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    ))}
                <div className="flex flex-col justify-center items-center lg:w-52 lg:h-[20rem] w-[9rem] h-[14rem] rounded-2xl m-5">
                  <Link to="/create-recipe">
                    <button
                      type="button"
                      className="flex flex-col justify-center items-center gap-y-5"
                    >
                      <img src={plus} alt="Logo plus" />
                      <p>Ajouter une recette</p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserRecipes;
