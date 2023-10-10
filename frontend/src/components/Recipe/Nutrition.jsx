import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function Nutrition() {
  const [nutrition, setNutrition] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/recipe-nutrition/${id}`)
      .then((response) => {
        setNutrition(response.data[0].nutrition);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <ul className="list-disc list-inside ml-7 md:text-lg">
          <li>Calories : {nutrition.energy} kcal</li>
          <li>Protéines : {nutrition.proteins} g</li>
          <li>Glucides : {nutrition.sugar} g</li>
          <li>Lipides : {nutrition.fat} g</li>
          <li>Fibres : {nutrition.fiber} g</li>
        </ul>
      )}
    </div>
  );
}

export default Nutrition;
