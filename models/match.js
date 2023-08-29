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
      _id: false,
      player_id: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      username: String,
      role: String,
      score: Number,
    },
  ],
  winners: [
    {
      _id: false,
      player_id: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      username: String,
    },
  ],
})

module.exports = mongoose.model("Match", matchSchema)
