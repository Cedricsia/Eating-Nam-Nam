import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import expressAPI from "../services/expressAPI";
import StepCard from "../components/Recipe/StepCard";
import RecipeHeader from "../components/Recipe/RecipeHeader";
import Comments from "../components/Recipe/Comments";
import Ingredients from "../components/Recipe/Ingredients";
import Nutrition from "../components/Recipe/Nutrition";
import Labels from "../components/Recipe/Labels";

function Recipe() {
  const [isLoading, setIsLoading] = useState(true);
  const [nbPerson, setNbPerson] = useState();

  const { id } = useParams();

  function addOnePerson() {
    setNbPerson(nbPerson + 1);
  }

  function removeOnePerson() {
    if (nbPerson === 1) {
      setNbPerson(1);
    } else {
      setNbPerson(nbPerson - 1);
    }
  }

  useEffect(() => {
    expressAPI
      .get(`/recipe-initial-portion/${id}`)
      .then((response) => {
        setNbPerson(response.data[0].initial_portion);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="bg-neutral flex flex-col">
      {isLoading ? (
        <h1 className="text-center my-24">Chargement en cours</h1>
      ) : (
        <div className="flex justify-center">
          <div className="max-w-7xl w-full">
            <div>
              <RecipeHeader />
            </div>
            <div className="flex items-center justify-center my-5 md:justify-start md:ml-6 md:mt-12 lg:ml-16">
              <button
                type="button"
                className="text-3xl text-secondary border border-base-content rounded-l-lg px-2"
                onClick={removeOnePerson}
              >
                -
              </button>
              <p className="text-xl text-primary px-3 py-1 border-y border-base-content">
                {`${nbPerson} ${nbPerson === 1 ? "personne" : "personnes"}`}
              </p>
              <button
                type="button"
                className="text-3xl text-secondary border border-base-content rounded-r-lg px-2"
                onClick={addOnePerson}
              >
                +
              </button>
            </div>

            <div className="border-t border-base-content md:hidden" />

            <div className="md:flex md:mr-6">
              <div className="mx-4 md:mx-0 md:ml-6 lg:ml-16 lg:mr-8">
                <div className="">
                  <h2 className="mt-2 mb-2 pt-3">Ingrédients</h2>
                  <Ingredients nbPerson={nbPerson} />
                </div>
                <div className="md:hidden">
                  <h2 className="mt-10 mb-2">Étapes</h2>
                  <div className="mt-4">
                    <StepCard />
                  </div>
                </div>
                <h2 className="mb-2 mt-10">Infos nut. - pour 1 portion</h2>
                <Nutrition />
                <div className="border-base-content w-screen -ml-4 border-b pt-6 md:hidden" />
                <h2 className="mb-2 mt-10">Labels</h2>
                <div className="">
                  <Labels />
                </div>
              </div>

              <div className="hidden md:-mt-24 md:block lg:mr-10">
                <h2 className="mt-10 mb-2">Étapes</h2>
                <div className="mt-4">
                  <StepCard />
                </div>
              </div>
            </div>

            <div className="border-base-content border-b mt-6" />

            <div className="mx-4 md:mx-6 lg:mx-16">
              <Comments />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Recipe;
