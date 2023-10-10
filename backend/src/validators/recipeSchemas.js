const Joi = require("joi");

const recipeSchemas = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.empty": "Un nom est requis",
    "string.base": "Le nom doit être une chaîne de caractères.",
    "string.min": "Le nom doit contenir au moins 3 lettres.",
  }),
  steps: Joi.object().required().messages({
    "any.required": "Les étapes sont requises.",
    "object.base": "Les étapes doivent être un objet.",
  }),
  difficulty: Joi.string()
    .valid("Facile", "Moyen", "Difficile")
    .required()
    .messages({
      "any.required": "La difficulté est requise.",
      "string.base": "La difficulté doit être une chaîne de caractères.",
      "any.only": "La difficulté doit être 'Facile', 'Moyen' ou 'Difficile'.",
    }),
  cooking_time: Joi.number().min(1).required().messages({
    "number.base": "Le temps de préparation doit être un nombre.",
    "number.min": "Le temps de préparation doit être d'au moins 1.",
  }),
  time: Joi.number().min(1).required().messages({
    "number.base": "Le temps total doit être un nombre.",
    "number.min": "Le temps total doit être d'au moins 1.",
  }),
  nutrition: Joi.object().required().messages({
    "object.base": "La nutrition doit être un objet.",
    "any.required": "La nutrition est requise.",
  }),
  initial_portion: Joi.number().min(1).required().messages({
    "any.required": "La portion initiale est requise.",
    "number.base": "La portion initiale doit être un nombre.",
    "number.min": "La portion initiale doit être d'au moins 1.",
  }),
  user_id: Joi.number().required().messages({
    "any.required": "vous devez etre connecté pour pouvoir crée des recettes ",
  }),
  id: Joi.number(),
  creation_date: Joi.string(),
  image: Joi.string(),
});

module.exports = recipeSchemas;
