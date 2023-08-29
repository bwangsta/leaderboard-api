function formatQuery(query) {
  const { game, player } = query
  let newQuery = {}
  if (game) {
    newQuery = { ...newQuery, game: toTitleCase(game, "-") }
  }
  if (player) {
    newQuery = { ...newQuery, players: { $elemMatch: { _id: player } } }
  }

  return newQuery
}

function toTitleCase(name, delimiter = " ") {
  const words = name.split(delimiter)
  const newName = words
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ")
  return newName
}

module.exports = { formatQuery, toTitleCase }
