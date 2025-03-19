// const mongoose = require("mongoose");
// require("dotenv").config({ path: "./config.env" });

// const dbURI = process.env.ATLAS_URI;

// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(dbURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("Connected to MongoDB Atlas successfully.");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = {
//   connectToMongoDB,
//   mongoose,
// };

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
