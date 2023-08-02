const { bangRoles } = require("../data")

function sample(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// Generate random number of players depending on the game
function generateNumberOfPlayers(game, playerIds) {
  let numberOfPlayers = 0
  switch (game) {
    case "Catan":
      numberOfPlayers = getRandom(3, 5)
      break
    case "Bang":
      numberOfPlayers = getRandom(3, 9)
      break
    case "Mahjong":
      numberOfPlayers = 4
      break
    case "Ticket To Ride":
      numberOfPlayers = getRandom(2, 6)
  }
  const players = []
  const uniquePlayers = new Set()
  let i = 0
  while (i < numberOfPlayers) {
    const obj = {}
    const index = getRandom(0, playerIds.length)
    if (uniquePlayers.has(index)) {
      continue
    }
    obj.player = playerIds[index]._id
    if (generateRole(game)) {
      obj.role = generateRole(game)
    }
    if (generateScore(game)) {
      obj.score = generateScore(game)
    }
    players.push(obj)
    uniquePlayers.add(index)
    i++
  }
  return players
}

// Generate random score depending on the game
function generateScore(game) {
  let min = 0
  let max = 0
  switch (game) {
    case "Catan":
      min = 2
      max = 11
      break
    case "Ticket To Ride":
      min = -340
      max = 296
      break
    case "Mahjong":
      min = 1
      max = 89
      break
    default:
      return null
  }

  return getRandom(min, max)
}

// Generate random role if the game is Bang
function generateRole(game) {
  if (game === "Bang") {
    const index = getRandom(0, bangRoles.length)
    return bangRoles[index]
  }
  return null
}

// Generate winner(s) depending on the game
function generateWinners(game, players) {
  if (game === "Bang") {
    const player = sample(players)
    return player.player
  }
  winner = null
  maxScore = -Infinity
  for (const { player, score } of players) {
    if (score >= maxScore) {
      winner = player
      maxScore = score
    }
  }
  return [winner]
}

module.exports = {
  sample,
  generateNumberOfPlayers,
  generateWinners,
}
