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

const matchSchema = Joi.object({
  date: Joi.date(),
  game: Joi.string().required(),
  players: Joi.array()
    .items(
      Joi.object({
        player_id: Joi.string(),
        username: Joi.string().required(),
        role: Joi.string(),
        score: Joi.number(),
      })
    )
    .required(),
  winners: Joi.array()
    .items(
      Joi.object({ player_id: Joi.string(), username: Joi.string().required() })
    )
    .min(1)
    .required(),
})

module.exports = {
  playerSchema,
  matchSchema,
}
