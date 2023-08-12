const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  wins: { type: Number, default: 0 },
  played: { type: Number, default: 0 },
})

module.exports = mongoose.model("Player", playerSchema)
