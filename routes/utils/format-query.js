function formatQuery(query) {
  const { name } = query
  if (name) {
    const words = name.split("-")
    const formattedWord = words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1)
      })
      .join(" ")
    return { ...query, name: formattedWord }
  }
  return {}
}

module.exports = formatQuery
