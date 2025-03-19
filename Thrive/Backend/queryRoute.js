const express = require("express")
const database = require("./connect")

let queryRoute = express.Router()

// query AI
queryRoute.route("/query").post(async (reqeust, response) => {
    

});

module.exports = queryRoute;