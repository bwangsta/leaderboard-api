const express = require("express")
const { formatQuery } = require("./utils/formatter")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catch-async")
const { matchSchema } = require("../schemas")
const Match = require("../models/match")

const router = express.Router()

function validateMatch(req, res, next) {
  const { error } = matchSchema.validate(req.body)
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
    const matches = await Match.find(query).sort({ date: "descending" }).exec()
    res.json(matches)
  })
)

// Get One
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const match = await Match.findById(id).exec()
    if (!match) {
      throw new AppError("Match Not Found", 404)
    }
    res.json(match)
  })
)

// Create
router.post(
  "/",
  validateMatch,
  catchAsync(async (req, res) => {
    const match = new Match(req.body)
    const newMatch = await match.save()
    res.status(201).json(newMatch)
  })
)

// Update
router.patch(
  "/:id",
  validateMatch,
  catchAsync(async (req, res) => {
    const { id } = req.params
    await Match.findByIdAndUpdate(id, { ...req.body }).exec()
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
    await Match.findByIdAndDelete(id).exec()
    res.json({ message: "Successfully deleted " + id })
  })
)

module.exports = router
