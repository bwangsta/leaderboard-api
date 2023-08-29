const express = require("express")
const catchAsync = require("../utils/catch-async")
const Match = require("../models/match")
const { createRankings } = require("./utils/pipelines")
const { toTitleCase } = require("./utils/formatter")

const router = express.Router()

// Get all rankings
router.get(
  "/",
  catchAsync(async (req, res) => {
    const rankings = await Match.aggregate(createRankings).exec()
    res.json(rankings)
  })
)

// Get rankings depending on the type of game
router.get(
  "/:game",
  catchAsync(async (req, res) => {
    const { game } = req.params
    const gameName = toTitleCase(game, "-")
    const rankings = await Match.aggregate([
      {
        $match: {
          game: gameName,
        },
      },
      ...createRankings,
    ]).exec()

    res.json({ game: gameName, rankings: rankings })
  })
)

module.exports = router
