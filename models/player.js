const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  games: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
    },
  ],
})

module.exports = mongoose.model("Player", playerSchema)
