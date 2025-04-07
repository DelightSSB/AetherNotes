const express = require("express")
const database = require("./connect")

let uploadRoute = express.Router()

// upload doc data in DB
uploadRoute.route("/upload").post(async (reqeust, response) => {
let db = database.getDB()

let mongoObject = {
    id: reqeust.body.id,
    title: reqeust.body.title,
    client: reqeust.body.client,
    date: reqeust.body.date,
    notes: reqeust.body.notes,
}
let data = await db.collection("MeetingNotes").insertOne(mongoObject)

response.json(data)
    
})

module.exports = uploadRoute
