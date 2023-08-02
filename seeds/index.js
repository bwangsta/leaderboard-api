require("dotenv").config()
const mongoose = require("mongoose")
const { firstNames, lastNames, games } = require("./data")
const {
  sample,
  generateNumberOfPlayers,
  generateWinners,
} = require("./utils/helper")
const Player = require("../models/player")
const Game = require("../models/game")

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))

const LIMIT = 50

async function seedPlayers() {
  await Player.deleteMany()
  for (let i = 0; i < LIMIT; i++) {
    const firstName = firstNames[i]
    const lastName = lastNames[i]
    const player = new Player({
      username: `${firstName}${lastName}`,
      first_name: firstName,
      last_name: lastName,
      wins: 0,
      played: 0,
    })
    await player.save()
  }
}

async function seedGames() {
  await Game.deleteMany()
  const playerIds = await Player.find().select("_id").exec()

  for (let i = 0; i < LIMIT; i++) {
    const gameName = sample(games)
    const players = generateNumberOfPlayers(gameName, playerIds)
    const winners = generateWinners(gameName, players)

    const game = new Game({
      name: gameName,
      players: players,
      winners: winners,
    })
    await game.save()
  }
}

async function seedPlayerStats() {
  const players = await Player.find().exec()
  for (let player of players) {
    const gamesPlayed = await Game.find({
      players: { $elemMatch: { player: player } },
    }).exec()
    const gamesWon = await Game.find({ winners: { $in: player._id } }).exec()
    await Player.findByIdAndUpdate(player._id, {
      wins: gamesWon.length,
      played: gamesPlayed.length,
    })
  }
}

seedPlayers()
  .then(seedGames)
  .then(seedPlayerStats)
  .then(() => {
    mongoose.connection.close()
    console.log("Disconnected")
  })
