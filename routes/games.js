const express = require("express")
const formatQuery = require("./utils/format-query")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catch-async")
const { gameSchema } = require("../schemas")
const Game = require("../models/game")

const router = express.Router()

function validateGame(req, res, next) {
  const { error } = gameSchema.validate(req.body)
  if (error) {
    const message = error.details.map((el) => el.message).join(",")
    throw new AppError(message, 400)
  } else {
    next()
  }
}

// Get All
router.get(
  "/",
  catchAsync(async (req, res) => {
    const query = formatQuery(req.query)
    games = await Game.find(query).exec()
    res.json(games)
  })
)

// Get One
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const game = await Game.findById(id).exec()
    if (!game) {
      throw new AppError("Game Not Found", 404)
    }
    res.json(game)
  })
)

// Create
router.post(
  "/",
  validateGame,
  catchAsync(async (req, res) => {
    const game = new Game(req.body)
    const newGame = await game.save()
    res.status(201).json(newGame)
  })
)

// Update
router.patch(
  "/:id",
  validateGame,
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Game.findByIdAndUpdate(id, { ...req.body }).exec()
    res.json({
      message: `Successfully updated ${id}`,
    })
  })
)

// Delete
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Game.findByIdAndDelete(id).exec()
    res.json({ message: "Successfully deleted " + id })
  })
)

module.exports = router
