import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import expressAPI from "../services/expressAPI";

function RatingStar({ id }) {
  const [rating, setRating] = useState(null);
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (id) {
      expressAPI
        .get(`/rate/${id}`)
        .then((res) => {
          setRating(res.data.average);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du rating :", error);
        });
    }
  }, [id]);

  return (
    <div>
      {stars.map((elem) => (
        <input
          key={elem}
          name={elem}
          className={`mask mask-star-2 bg-primary w-[1rem] lg:w-[1.5rem] ${
            elem <= rating ? "opacity-1" : "opacity-30"
          }`}
        />
      ))}
    </div>
  );
}

RatingStar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RatingStar;
