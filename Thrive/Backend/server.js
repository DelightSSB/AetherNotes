const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const upload = require("./uploadRoute")
const summary = require("./summaryRoute")

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json({limit: '150mb'}))
app.use(upload)
app.use(summary)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})