const Joi = require("joi");

const ingredientSchemas = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Le nom doit être une chaîne de caractères.",
    "string.min": "Le nom doit contenir au moins {#limit} caractères.",
    "any.required": "Le nom est requis.",
  }),
  proteins: Joi.number().required().messages({
    "number.base": "Les protéines doivent être un nombre.",
    "any.required": "Les protéines sont requises.",
  }),
  fat: Joi.number().required().messages({
    "number.base": "Les matières grasses doivent être un nombre.",
    "any.required": "Les matières grasses sont requises.",
  }),
  sugar: Joi.number().required().messages({
    "number.base": "Le sucre doit être un nombre.",
    "any.required": "Le sucre est requis.",
  }),
  fiber: Joi.number().required().messages({
    "number.base": "Les fibres doivent être un nombre.",
    "any.required": "Les fibres sont requises.",
  }),
  energy: Joi.number().required().messages({
    "number.base": "L'énergie doit être un nombre.",
    "any.required": "L'énergie est requise.",
  }),
  unit: Joi.string().valid("g", "cL").required().messages({
    "any.only": "L'unité doit être 'g' ou 'cL'.",
    "any.required": "L'unité est requise.",
  }),
});

module.exports = ingredientSchemas;
