const express = require("express")
const database = require("./connect")

let postRoutes = express.Router()

// upload doc data in DB
postRoutes.route("/upload").post(async (reqeust, response) => {
let db = database.getDB()

let mongoObject = {
    title: reqeust.body.title,
    client:reqeust.body.client,
    author:reqeust.body.author,
    participants:reqeust.body.participants,
    date:reqeust.body.date,
    notes: reqeust.body.notes,
}
let data = await db.collection("MeetingNotes").insertOne(mongoObject)

response.json(data)
    
})

module.exports = postRoutes
