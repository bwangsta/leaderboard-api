const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  players: [{ type: String, required: true }],
  roles: [{ type: Map, of: String }],
  points: [{ type: Map, of: Number }],
  winners: [{ type: String, required: true }],
})

module.exports = mongoose.model("Game", gameSchema)
