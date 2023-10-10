const models = require("../models");

const checkRecipeIngredient = async (req, res, next) => {
  let labels = {};
  if (req.path.startsWith("/recipes/")) {
    const data = JSON.parse(req.body.data);
    labels = data.labels;
  } else {
    labels = JSON.parse(req.body.labels);
  }
  try {
    const labelPromises = labels.map(async (label) => {
      const [rows] = await models.label.find(label.label_id);

      if (rows.length === 0) {
        throw new Error("label not found");
      }
    });

    await Promise.all(labelPromises);

    next();
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "label not found" });
  }
};

module.exports = checkRecipeIngredient;
