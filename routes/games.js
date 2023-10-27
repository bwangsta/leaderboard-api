const express = require("express")
const catchAsync = require("../utils/catch-async")
const Match = require("../models/match")

const router = express.Router()

router.get(
  "/",
  catchAsync(async (req, res) => {
    const games = await Match.distinct("game")
    const data = { results: games }
    res.json(data)
  })
)

module.exports = router
