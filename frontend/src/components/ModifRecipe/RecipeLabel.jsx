import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import expressAPI from "../../services/expressAPI";

function RecipeLabel({ all, setAll }) {
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelecedLabels] = useState([]);

  useEffect(() => {
    expressAPI.get(`/label`).then((res) => {
      setLabels(res.data);
    });
    const labelNames = all.labels.map((label) => label.name);
    setSelecedLabels(labelNames);
  }, []);

  const handleSelect = (label) => {
    const { id } = all.recipe;
    const updatedLabels = [...all.labels];
    const existingLabelIndex = updatedLabels.findIndex(
      (elem) => elem.name === label.name
    );

    if (existingLabelIndex !== -1) {
      updatedLabels.splice(existingLabelIndex, 1);
    } else if (updatedLabels.length < 3) {
      updatedLabels.push({ name: label.name, id: label.id, recipe_id: id });
    }
    const labelNames = updatedLabels.map((elem) => elem.name);
    setSelecedLabels(labelNames);
    setAll({ ...all, labels: updatedLabels });
  };

  return (
    <div className=" text-center flex justify-center flex-wrap mt-10">
      {labels &&
        labels.map((label) => (
          <button
            key={label.id}
            type="button"
            className={`mx-2 my-2 rounded-xl   hover:bg-secondary p-3 ${
              selectedLabels.includes(label.name) ? "bg-secondary" : "bg-accent"
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

export default RecipeLabel;
RecipeLabel.propTypes = {
  all: PropTypes.shape({
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
    recipe: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  setAll: PropTypes.func.isRequired,
};
