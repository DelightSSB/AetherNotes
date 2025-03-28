// const connect = require("./connect");
// const express = require("express");
// const cors = require("cors");
// const upload = require("./uploadRoute");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json({ limit: "100mb" }));
// app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
// app.use(upload);

// connect.connectToServer()
//   .then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error("Failed to start server due to database connection failure:", error);
//   });

const connect = require("./connect")
const express = require("express")
const cors = require("cors")
const upload = require("./uploadRoute")
const summary = require("./summaryRoute")



const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json({limit: '150mb'}))
//app.use(fileUpload())
app.use(upload)
app.use(summary)

app.listen(PORT, () => {
    connect.connectToServer()
    console.log(`Server is running on port ${PORT}`)
})