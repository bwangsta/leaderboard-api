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

const LIMIT = 10

async function seedPlayers() {
  await Player.deleteMany()
  for (let i = 0; i < LIMIT; i++) {
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

async function seedGames() {
  await Game.deleteMany()
  const usernames = await Player.find().select("username")

  for (let i = 0; i < LIMIT; i++) {
    const gameName = sample(games)
    const players = generateNumberOfPlayers(gameName, usernames)
    const winners = generateWinners(gameName, players)

    const game = new Game({
      name: gameName,
      players: players,
      winners: winners,
    })
    await game.save()
  }
}

seedPlayers()
  .then(seedGames)
  .then(() => {
    mongoose.connection.close()
    console.log("Disconnected")
  })
