import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import expressAPI from "../../services/expressAPI";

function CookingLabels({ selectedLabels, setSelectedLabels }) {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    expressAPI.get(`/label`).then((res) => {
      setLabels(res.data);
    });
  }, []);
  const handleSelect = (label) => {
    const newArray = [...selectedLabels];
    const labelIndex = newArray.indexOf(label);

    if (labelIndex !== -1) {
      newArray.splice(labelIndex, 1);
    } else if (newArray.length <= 3) {
      newArray.push(label);
    }

    if (newArray.length <= 3) {
      setSelectedLabels(newArray);
    }
  };

  return (
    <div className=" text-center flex justify-center flex-wrap mt-10">
      {labels &&
        labels
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((label) => (
            <button
              key={label.id}
              type="button"
              className={`mx-2 my-2 rounded-xl p-3 m-1 hover:bg-secondary ${
                selectedLabels.includes(label) ? "bg-secondary" : "bg-accent"
              }`}
              value={label}
              onClick={() => handleSelect(label)}
            >
              {label.name}
            </button>
          ))}
    </div>
  );
}

export default CookingLabels;

CookingLabels.propTypes = {
  selectedLabels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  setSelectedLabels: PropTypes.func.isRequired,
};
