const { MongoClient, Collection, ServerApiVersion } = require("mongodb")
require("dotenv").config({path: "./config.env"})

const db = process.env.ATLAS_URI

const client = new MongoClient(db, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


let database

module.exports = {
    connectToServer: () => {
        database = client.db("ThriveNotes")
    },
    getDB: () => {
        return database
    }
}
