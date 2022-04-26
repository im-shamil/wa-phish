var { spawn } = require("child_process")
var chalk = require("chalk")
module.exports = function (port) {
        var data = spawn(`${__dirname}/./cloudflared`, [
                `tunnel --url localhost:${port}`
        ])
        data.stdout.on("data", (data) => {
                console.log(chalk.yellow.bold(data.toString()))
        })
        data.stderr.on('data', function (data) {
          console.log(chalk.yellow.bold(data.toString()))
        })

        data.on('exit', function (code) {
          console.log(chalk.red.bold('process exited with code ' + code.toString()))
          process.exit(code)
        })
        process.on('SIGINT' || 'SIGTERM', (key) => {
        data.kill(key)
        })
}
