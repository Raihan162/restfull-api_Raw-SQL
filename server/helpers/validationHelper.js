const Joi = require('joi');
const Boom = require('boom');

const pokemonListValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().optional().description('Pokemon name; i.e. Bulbasaur')
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const studentAddValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    major: Joi.string().required(),
    contact: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const lecturerAddValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    contact: Joi.number().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

module.exports = {
  pokemonListValidation,
  studentAddValidation,
  lecturerAddValidation
};
