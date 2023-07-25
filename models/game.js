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
      type: mongoose.Schema.ObjectId,
      ref: "Player",
    },
  ],
  winners: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Player",
    },
  ],
})

module.exports = mongoose.model("Game", gameSchema)