const express = require("express");
const database = require("./connect"); // Your MongoDB connection
const mongoose = require("mongoose");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const reader = require("any-text");

let uploadRoute = express.Router();

// Initialize GridFS Stream
const conn = mongoose.connection;
let gfs;

conn.once("open", () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("uploads"); // Collection to store files
});

// Configure GridFS Storage
const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/yourDatabaseName", // Change to your DB URL
    file: (req, file) => {
        return {
            filename: file.originalname,
            bucketName: "uploads",
        };
    },
});

const upload = multer({ storage });

// Upload File to GridFS
uploadRoute.post("/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        console.log("File uploaded to GridFS:", req.file.filename);

        let db = database.getDB();
        let fileText = await reader.getText(req.file.filename);

        let mongoObject = {
            title: req.body.title,
            client: req.body.client,
            author: req.body.author,
            participants: req.body.participants,
            date: req.body.date,
            notes: fileText,
        };

        let data = await db.collection("MeetingNotes").insertOne(mongoObject);
        res.json(data);
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ error: "Failed to process file" });
    }
});

module.exports = uploadRoute;
