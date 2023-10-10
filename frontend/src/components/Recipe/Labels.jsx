import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../../services/expressAPI";

function Labels() {
  const [labels, setLabels] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/labels-recipe/${id}`)
      .then((response) => {
        setLabels(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Chargement en cours</p>
      ) : (
        <div className="flex justify-around mx-2 md:text-xl md:flex-wrap md:justify-start md:gap-x-3">
          {labels.map((item) => (
            <p className="my-1" key={item.id}>
              #{item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Labels;
