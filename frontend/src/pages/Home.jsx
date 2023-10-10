import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ModalConnection from "../components/modal/ModalConnection";
import ModalCreateAccount from "../components/modal/ModalCreateAccount";
import RatingStar from "../components/RatingStar";
import RecipeCards from "../components/RecipeCards";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";
import expressAPI from "../services/expressAPI";

function Home() {
  const { user } = useCurrentUserContext();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [lastFourRecipes, setLastFourRecipes] = useState();
  const [mostPopularRecipe, setMostPopularRecipe] = useState();

  const navigate = useNavigate();

  function handleClick() {
    if (user) {
      navigate("/recipes");
    } else {
      document.getElementById("connectionModal").showModal();
    }
  }
  const openConnectionModal = () => {
    document.getElementById("connectionModal").showModal();
  };

  useEffect(() => {
    expressAPI
      .get(`/most-popular-recipe`)
      .then((res) => {
        setMostPopularRecipe(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });

    expressAPI
      .get(`/last-four-recipes`)
      .then((res) => {
        setLastFourRecipes(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral max-w-[100vw] overflow-hidden">
      <div className="bg-banniere-sm md:bg-banniere-md lg:bg-banniere-lg bg-center h-72 lg:h-[30rem] flex flex-col justify-center items-center px-10 md:px-34 lg:px-72 text-center text-neutral">
        {!user ? (
          <div>
            <div className="bg-gray-800 bg-opacity-40 p-2 md:p-6 rounded-3xl">
              <p className="text-sm md:text-lg lg:text-2xl opacity-100 text-neutral">
                Nam Nam visiteur !
                <br />
                Passionné(e) ou en recherche d’inspiration, ici tout
                amoureux(se) de la cuisine se sent comme à la maison. Au prix
                d’une simple inscription, devenez ce gourmand(e) assumé(e) qui
                cultive le plaisir des papilles.
              </p>
            </div>
            <button
              type="button"
              onClick={openConnectionModal}
              className="bg-secondary text-neutral text-2xl font-semibold px-11 py-3 rounded-md mt-8 lg:mt-10 --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Se connecter
            </button>
          </div>
        ) : (
          <div className="bg-gray-800 bg-opacity-40 p-2 md:p-6 rounded-3xl">
            <p className="text-sm md:text-lg lg:text-2xl opacity-100 text-neutral">
              Bonjour Ami Cuisinier,
              <br />
              Vous pouvez consulter toutes les recettes, en créer de nouvelles,
              les mettre en favori ou poster des commentaires.
              <br />
              Bonne cuisine !
            </p>
          </div>
        )}
        <ModalConnection />
        <ModalCreateAccount />
      </div>
      <div className="lg:ml-[10%] lg:mr-[10%] md:ml-[5%] md:mr-[5%] flex justify-center flex-col mb-10 ">
        <div className="flex flex-col justify-between align-middle mt-10">
          <div className="m-5">
            <h4 className="text-2xl"> Recette du moment</h4>
          </div>
          {mostPopularRecipe &&
            mostPopularRecipe.map((popular) => (
              <Link to={`/most-popular-recipe/${popular.id}`}>
                <div
                  className="flex flex-col md:flex-row justify-center items-center w-[100%] md:h-[45vh]"
                  key={`${popular.id}`}
                >
                  <img
                    className="m-5 lg:w-[30vw] md:w-[40vw] w-[80vw] h-[38vh] object-cover bg-secondary rounded-xl text-center "
                    src={`${backendUrl}/uploads/recipes/${popular.image}`}
                    alt="Best recipe of the month"
                  />
                  <div className="flex flex-col m-5">
                    <h5 className="m-1 font-semibold text-xl text-center md:text-left">
                      {popular.name}
                    </h5>
                    <p className="m-1 text-center md:text-left">
                      Auteur : {`${popular.pseudo}`}
                    </p>
                    <div className="md:mt-5 md:mb-5 md:ml-1 m-1  text-center md:text-left">
                      <RatingStar id={parseInt(popular.id, 10)} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="flex justify-between items-center ml-5 mt-10 mb-10 mr-10 ">
          <div>
            <h4 className="text-2xl">Dernières Recettes</h4>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="bg-primary text-neutral text-xl ml-auto font-semibold px-5 py-2 rounded-md --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 max-sm:hidden md:visible "
          >
            En voir plus...
          </button>
          <ToastContainer theme="colored" />
        </div>
        <div className="flex lg:mb-10 h-full m-auto lg:overflow-visible">
          <div className="max-[1000px]:overflow-x-scroll max-[900px]:w-[90vw] h-80 flex lg:justify-center xl:justify-start max-[1300px]:max-w-[800px]">
            {lastFourRecipes &&
              lastFourRecipes.map((recipe) => (
                <div className="mx-4 lg:mx-2 xl:mx-4">
                  <RecipeCards
                    key={recipe.id}
                    id={recipe.id}
                    img={recipe.image}
                    title={recipe.name}
                    time={recipe.time}
                    userImg={recipe.user_img}
                  />
                </div>
              ))}
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="bg-primary text-neutral max-w-[40vw] mx-auto mt-[1em] text-base font-semibold px-2 py-2 rounded-md --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 md:hidden"
        >
          En voir plus...
        </button>
        <ToastContainer theme="colored" />
      </div>
    </div>
  );
}

export default Home;
