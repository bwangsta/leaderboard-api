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
  players: [{ username: String, role: String, score: Number }],
  winners: [String],
})

module.exports = mongoose.model("Game", gameSchema)
