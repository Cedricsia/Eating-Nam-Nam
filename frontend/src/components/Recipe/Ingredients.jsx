import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

function Ingredients({ nbPerson }) {
  const [ingredients, setIngredients] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/recipe-ingredient/${id}`)
      .then((response) => {
        setIngredients(response.data);
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
          <ul className="list-disc list-inside ml-7 md:text-lg md:pr-2">
            {ingredients
              .sort((a, b) => b.quantity - a.quantity)
              .map((item) => (
                <li key={item.name}>
                  {item.quantity * nbPerson} {item.unit} {item.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Ingredients;

Ingredients.propTypes = {
  nbPerson: PropTypes.number.isRequired,
};
