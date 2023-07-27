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
})

module.exports = mongoose.model("Player", playerSchema)
