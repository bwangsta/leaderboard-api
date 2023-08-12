const mongoose = require("mongoose")

const matchSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  game: {
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

module.exports = mongoose.model("Match", matchSchema)
