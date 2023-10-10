import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import RatingStar from "../RatingStar";
import firstLetterUppercase from "../../services/firstLetterUpperCase";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import expressAPI from "../../services/expressAPI";

import chrono from "../../assets/images/stopwatch.png";
import difficultyPicture from "../../assets/images/biceps.png";
import mortar from "../../assets/images/mortar.png";
import convertTime from "../../services/convertTime";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

function RecipeHeader() {
  const [isLoading, setIsLoading] = useState(true);
  const [header, setHeader] = useState();
  const [favorite, setFavorite] = useState();

  const { user } = useCurrentUserContext();
  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/recipe-header/${id}`)
      .then((response) => {
        setHeader(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));

    expressAPI
      .get(`/favorite/${id}/${user}`)
      .then((response) => {
        setFavorite(response.data.is_fav);
      })
      .catch((err) => console.error(err));
  }, []);

  function changeFavorite() {
    if (user) {
      if (favorite) {
        expressAPI.delete(`/favorite/${id}/${user}`).then(() => {
          setFavorite(false);
        });
      }
      if (!favorite) {
        expressAPI.post(`/favorite/${id}/${user}`).then(() => {
          setFavorite(true);
        });
      }
    } else {
      document.getElementById("connectionModal").showModal();
    }
  }
  return (
    <div>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div>
          <div className="md:flex md:justify-center md:mt-12">
            <div className="flex justify-center">
              <img
                className="md:rounded-xl md:max-h-64"
                src={`${backendUrl}/uploads/recipes/${header[0].image}`}
                alt={header[0].image}
              />
            </div>
            <div className="md:self-center md:relative bg-secondayr">
              <div className="flex justify-center md:justify-start md:ml-4">
                <h1 className="basis-5/6 text-2xl text-center my-2 md:max-w-xs md:text-left lg:max-w-md md:text-3xl">
                  {header[0].name}
                </h1>
                <div className="basis-1/6 self-center text-center md:absolute md:left-48 md:bottom-0">
                  <button
                    type="button"
                    id="favorite"
                    className=""
                    onClick={changeFavorite}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-6 h-6 ${
                        favorite ? "fill-primary stroke-primary" : "fill-none"
                      } md:w-8 md:h-8`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <p className="text-center my-2 md:text-left md:ml-4 md:text-xl">
                <span className="font-bold">Auteur : </span>
                {header[0].pseudo}
              </p>
              <div className="hidden md:block md:ml-4 md:text-xl md:mt-6">
                <p>Note</p>
                <div>
                  <RatingStar id={id} />
                </div>
              </div>
            </div>
          </div>
          <div className="sm:hidden md:block md:border-base-content md:border-t md:mt-12 md:pb-3" />
          <div className="grid grid-rows-2 grid-cols-2 mx-4 md:grid-cols-3">
            <div className="flex items-center md:flex-col">
              <img src={chrono} alt="chrono" className="h-5 md:hidden" />
              <h2 className="hidden md:block md:pb-2">Temps total</h2>
              <div className="flex">
                <img
                  src={chrono}
                  alt="chrono"
                  className="hidden md:block md:h-5"
                />
                <p className="ml-2 md:text-lg">{convertTime(header[0].time)}</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-normal md:flex-col">
              <img
                src={difficultyPicture}
                alt="chrono"
                className="h-5 md:hidden"
              />
              <h2 className="hidden md:block md:pb-2">Difficulté</h2>
              <div className="flex">
                <img
                  src={difficultyPicture}
                  alt="chrono"
                  className="hidden md:block md:h-5"
                />
                <p className="ml-2 md:text-lg">
                  {firstLetterUppercase(header[0].difficulty)}
                </p>
              </div>
            </div>
            <div className="flex md:flex-col md:items-center">
              <img src={mortar} alt="chrono" className="h-5 md:hidden" />
              <h2 className="hidden md:block md:pb-2">Préparation</h2>
              <div className="md:flex">
                <img
                  src={mortar}
                  alt="chrono"
                  className="hidden md:block md:h-5"
                />
                <p className="ml-2 md:text-lg">
                  {convertTime(header[0].cooking_time)}
                </p>
              </div>
            </div>
            <div className="text-center md:hidden">
              <p>Note</p>
              <RatingStar id={id} />
            </div>
          </div>
          <div className="sm:hidden md:block md:border-base-content md:border-b md:-mt-12 " />
          <ToastContainer theme="colored" />
        </div>
      )}
    </div>
  );
}

export default RecipeHeader;
