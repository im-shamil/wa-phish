var fs = require("fs")
var download_ = require("download")
var spin = require("spinnies")
var spinner = require("./spinners.json")
var spin = new spin({
        spinner: spinner,
        spinnerColor: "green",
        color: "cyan"
})
function download (url) {
        spin.add("install", {
                text: "installing cloudflared"
        })
        var path = `${__dirname}/`
        download_(url, path, {filename: "cloudflared"}).then(() => {
                spin.succeed("install", {
                        text: "successfully installed cloudflared"
                })
                fs.chmod(`${__dirname}/cloudflared`, 755, () => {})
                process.exit()
        })
}

function install () {
        var arch = process.arch
        if (arch == "arm" || arch == "Android") {download ('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm')}
        else if (arch == "aarch64") {download ('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64')}
        else if (arch == "x856_64") {download ('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64')}
        else {download ('https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-386')}
}

install()
