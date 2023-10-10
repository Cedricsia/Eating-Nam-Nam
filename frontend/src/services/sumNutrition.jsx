function sumNutrition(array) {
  const nutritionTotal = array.reduce(
    (acc, ing) => {
      acc.proteins += ing.proteins * (ing.quantity / 100);
      acc.fat += ing.fat * (ing.quantity / 100);
      acc.sugar += ing.sugar * (ing.quantity / 100);
      acc.energy += ing.energy * (ing.quantity / 100);
      acc.fiber += ing.fiber * (ing.quantity / 100);

      return acc;
    },
    { proteins: 0, fat: 0, sugar: 0, energy: 0, fiber: 0, quantity: 0 }
  );

  const result = {
    proteins: parseFloat(nutritionTotal.proteins.toFixed(2)),
    fat: parseFloat(nutritionTotal.fat.toFixed(2)),
    sugar: parseFloat(nutritionTotal.sugar.toFixed(2)),
    energy: parseFloat(nutritionTotal.energy.toFixed(2)),
    fiber: parseFloat(nutritionTotal.fiber.toFixed(2)),
  };
  return result;
}

export default sumNutrition;
