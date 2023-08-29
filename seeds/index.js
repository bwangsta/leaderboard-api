require("dotenv").config()
const mongoose = require("mongoose")
const { firstNames, lastNames, games } = require("./data")
const { sample, generatePlayers, generateWinners } = require("./utils/helper")
const Player = require("../models/player")
const Match = require("../models/match")

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))

const PLAYER_LIMIT = 10
const MATCHES_LIMIT = 100

async function seedPlayers() {
  await Player.deleteMany()
  for (let i = 0; i < PLAYER_LIMIT; i++) {
    const firstName = firstNames[i]
    const lastName = lastNames[i]
    const player = new Player({
      username: `${firstName}${lastName}`,
      first_name: firstName,
      last_name: lastName,
    })
    await player.save()
  }
}

async function seedMatches() {
  await Match.deleteMany()
  const playerInfo = await Player.find({}, "_id username").exec()

  for (let i = 0; i < MATCHES_LIMIT; i++) {
    const game = sample(games)
    const players = generatePlayers(game, playerInfo)
    const winners = generateWinners(game, players)

    const match = new Match({
      game: game,
      players: players,
      winners: winners,
    })
    await match.save()
  }
}

seedPlayers()
  .then(seedMatches)
  .then(() => {
    mongoose.connection.close()
    console.log("Disconnected")
  })
