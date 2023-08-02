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
  players: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      role: String,
      score: Number,
    },
  ],
  winners: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
})

module.exports = mongoose.model("Game", gameSchema)
