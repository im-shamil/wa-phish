var express = require("express")
var app = express.Router()
app.get("/", (req, res) => {
        res.render("home")
})
module.exports = app
