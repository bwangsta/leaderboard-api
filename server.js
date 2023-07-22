require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const PORT = 8080

app.use(cors())

mongoose.connect(process.env.DATABASE_URI)
const db = mongoose.connection

db.on("error", (err) => console.error(err))
db.once("open", () => console.log("Connected to Database"))

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server Started. Listening On Port ${PORT}`)
})
