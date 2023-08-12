require("dotenv").config()
const morgan = require("morgan")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const AppError = require("./utils/AppError")
const matchesRouter = require("./routes/matches")
const playersRouter = require("./routes/players")

const app = express()
const PORT = 8080

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/matches", matchesRouter)
app.use("/players", playersRouter)

app.all("*", (req, res, next) => {
  next(new AppError("Page Not Found", 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong" } = err
  res.status(statusCode)
  res.json({ message: message })
})

app.listen(PORT, () => {
  console.log(`Server Started. Listening On Port ${PORT}`)
})
