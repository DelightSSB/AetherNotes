// const express = require("express");
// const database = require("./connect"); 
// const mongoose = require("mongoose");
// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const reader = require("any-text");

// let uploadRoute = express.Router();

// // Ensure mongoose is connected before proceeding with GridFS
// database.connectToMongoDB(); // Call connect function to initialize mongoose connection

// // Initialize GridFS Stream
// const conn = mongoose.connection;
// let gfs;

// conn.once("open", () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection("ThriveNotes"); 
// });

// // Configure GridFS Storage
// const storage = new GridFsStorage({
//     db: mongoose.connection.db, 
//     file: (req, file) => {
//         return {
//             filename: file.originalname,
//             bucketName: "ThriveNotes",
//         };
//     },
// });

// const upload = multer({ storage });

// // Upload File to GridFS
// uploadRoute.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ error: "No file uploaded" });
//         }

//         console.log("File uploaded to GridFS:", req.file.filename);

//         let db = database.mongoose.connection.db;
//         let fileText = await reader.getText(req.file.filename);

//         let mongoObject = {
//             notes: fileText,
//             id: req.body.id,
//             title: req.body.title,
//             client: req.body.client,
//             author: req.body.author,
//             participants: req.body.participants,
//             date: req.body.date,
//         };

//         let data = await db.collection("MeetingNotes").insertOne(mongoObject);
//         res.json(data);
//     } catch (error) {
//         console.error("Error processing file:", error);
//         res.status(500).json({ error: "Failed to process file" });
//     }
// });

// module.exports = uploadRoute;

const express = require("express")
const database = require("./connect")

let uploadRoute = express.Router()

// upload doc data in DB
uploadRoute.route("/upload").post(async (reqeust, response) => {
let db = database.getDB()

let mongoObject = {
    id: reqeust.body.id,
    title: reqeust.body.title,
    //client:reqeust.body.client,
    //author:reqeust.body.author,
    //participants:reqeust.body.participants,
    date:reqeust.body.date,
    notes: reqeust.body.notes,
}
let data = await db.collection("MeetingNotes").insertOne(mongoObject)

response.json(data)
    
})

module.exports = uploadRoute
