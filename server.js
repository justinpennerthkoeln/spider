const http = require("http");
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
var fileupload = require("express-fileupload");
var imageModel = require('./models/imageModel.js');

var session = require('express-session');

const app = express();
const server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set('trust proxy', 1);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}));

app.use(express.static(path.join(__dirname, "javascript")));
app.use(express.static(__dirname + '/public'));
app.use(fileupload());
app.use(express.static('public'));

app.set("view engine", "ejs");

const userController = require("./controllers/userController");
const galeryController = require("./controllers/galeryController");

// User routes
app.get("/", (req, res) => {res.redirect("/galery")});
app.get("/index", (req, res) => {res.redirect("/galery")});

app.route("/login")
    .get(userController.login)
    .post(urlencodedParser, userController.loginEval);

app.route("/logout")
    .get(userController.logout);

    

// Image routes
app.route("/galery")
    .get(galeryController.galery);

app.route("/galery/:id")
    .get(galeryController.galeryDetail);

app.route("/new-image")
    .get(galeryController.newImage)
    .post(urlencodedParser, galeryController.newImageEval);

app.route("/delete-image")
    .post(urlencodedParser, galeryController.deleteImage);


// Setting routes
app.route("/home")
   .get(userController.home);
//    .post(urlencodedParser, userController.homeEval);

app.route("/price-list")
    .get(userController.priceList)
    .post(urlencodedParser, userController.priceListEval);

app.route("/settings")
    .get(userController.settings);

app.post("/update-text", urlencodedParser, userController.updateText);



const socketio = require("socket.io");

const io = new socketio.Server(server);

io.on("connection", function(socket) {
    console.log("Established connection with client.");

    socket.on("disconnect", function(socket) {
        console.log("Disconnected from client.");
    });

    socket.on("getDetail", async function(id) {
        detail = await imageModel.getImage(id);
        if(detail.rowCount > 0) {
            socket.emit("gotDetail", detail.rows[0]);
        } else {
            socket.emit("gotDetail", {});
        }
    });

});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});