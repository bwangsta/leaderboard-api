function formatQuery(query) {
  const { name, player } = query
  let newQuery = {}
  if (name) {
    const words = name.split("-")
    const formattedWord = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1)
      })
      .join(" ")
    newQuery = { ...newQuery, name: formattedWord }
  }
  if (player) {
    newQuery = { ...newQuery, players: { $elemMatch: { player: player } } }
  }

  return newQuery
}

module.exports = formatQuery
