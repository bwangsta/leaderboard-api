require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const gamesRouter = require("./routes/games")
const playersRouter = require("./routes/players")

const app = express()
const PORT = 8080

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))

app.use(cors())
app.use(express.json())
app.use("/games", gamesRouter)
app.use("/players", playersRouter)

app.listen(PORT, () => {
  console.log(`Server Started. Listening On Port ${PORT}`)
})
