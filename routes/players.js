const express = require("express")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catch-async")
const Player = require("../models/player")

const router = express.Router()

// Get All
router.get(
  "/",
  catchAsync(async (req, res) => {
    const players = await Player.find().exec()
    res.json(players)
  })
)

// Get One
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const player = await Player.findById(id).exec()
    if (!player) {
      throw new AppError("Player Not Found", 404)
    }
    res.json(player)
  })
)

// Create
router.post(
  "/",
  catchAsync(async (req, res) => {
    const player = new Player(req.body)
    const newPlayer = await player.save()
    res.status(201).json(newPlayer)
  })
)

// Update
router.patch(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const player = await Player.findByIdAndUpdate(id, { ...req.body }).exec()
    res.json({
      message: `Successfully updated ${player.first_name} ${player.last_name}`,
    })
  })
)

// Delete
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const player = await Player.findByIdAndDelete(id).exec()
    res.json({
      message: `Successfully removed ${player.first_name} ${player.last_name}`,
    })
  })
)

module.exports = router
