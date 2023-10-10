import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function StepCard() {
  const [steps, setSteps] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/recipe-steps/${id}`)
      .then((response) => {
        setSteps(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div>
          {Object.keys(steps[0].steps).map((item) => (
            <div key={item} className="flex">
              <div className="bg-secondary w-24 h-7 rounded-md flex justify-center items-center text-accent md:text-lg md:w-32 md:h-10">
                Étape {item}
              </div>
              <div className="flex w-full min-h-8 ml-2 -mt-0.5 mb-2.5 items-center md:text-lg md:ml-4 md:mb-6 md:max-w-md lg:max-w-lg xl:max-w-2xl">
                {steps[0].steps[item]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StepCard;
