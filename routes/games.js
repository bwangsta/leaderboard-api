const express = require("express")
const formatQuery = require("./utils/format-query")
const Game = require("../models/game")

const router = express.Router()

// Get All
router.get("/", async (req, res) => {
  const query = formatQuery(req.query)
  try {
    const game = await Game.find(query).exec()
    res.json(game)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get One
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const game = await Game.findById(id).exec()
  res.json(game)
})

// Create
router.post("/", async (req, res) => {
  const game = new Game(req.body)
  try {
    const newGame = await game.save()
    res.status(201).json(newGame)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update
router.patch("/:id", async (req, res) => {
  const { id } = req.params
  await Game.findByIdAndUpdate(id, { ...req.body }).exec()
  res.json({
    message: `Successfully updated ${id}`,
  })
})

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    await Game.findByIdAndDelete(id).exec()
    res.json({ message: "Successfully deleted " + id })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router
