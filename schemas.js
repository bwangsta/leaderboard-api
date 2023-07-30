const Joi = require("joi")

const playerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  first_name: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .required(),
  last_name: Joi.string()
    .pattern(new RegExp(/^[a-zA-Z]+$/))
    .required(),
})

const gameSchema = Joi.object({
  name: Joi.string().required(),
  players: Joi.array()
    .items(
      Joi.object({
        username: Joi.string().required(),
        role: Joi.string(),
        score: Joi.number(),
      })
    )
    .required(),
  winners: Joi.array().items(Joi.string()).min(1).required(),
})

module.exports = {
  playerSchema,
  gameSchema,
}
