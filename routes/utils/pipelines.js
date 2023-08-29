const createRankings = [
  {
    $unwind: { path: "$players" },
  },
  {
    $unwind: { path: "$winners" },
  },
  {
    $addFields: {
      isWinner: {
        $cond: [{ $eq: ["$players._id", "$winners._id"] }, 1, 0],
      },
    },
  },
  {
    $group: {
      _id: "$players._id",
      username: { $first: "$players.username" },
      wins: { $sum: "$isWinner" },
      played: { $count: {} },
    },
  },
  {
    $sort: {
      wins: -1,
      played: 1,
    },
  },
]

module.exports = { createRankings }
