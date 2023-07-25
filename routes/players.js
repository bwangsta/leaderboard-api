const express = require("express")
const Player = require("../models/player")

const router = express.Router()

// Get All
router.get("/", async (req, res) => {
  try {
    const players = await Player.find()
    res.json(players)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get One
router.get("/:id", async (req, res) => {
  const { id } = req.params
  const player = await Player.findById(id)
  res.json(player)
})

// Create
router.post("/", async (req, res) => {
  const player = new Player(req.body)
  try {
    const newPlayer = await player.save()
    res.status(201).json(newPlayer)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update
router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const player = await Player.findByIdAndUpdate(id, { ...req.body })
  res.json({
    message: `Successfully updated ${player.first_name} ${player.last_name}`,
  })
})

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const player = await Player.findByIdAndDelete(id)
  res.json({
    message: `Successfully removed ${player.first_name} ${player.last_name}`,
  })
})

module.exports = router
