const http = require("http");
const express = require("express");
const path = require("path");
var bodyParser = require('body-parser');
const galery = require('./config/galery.json');
var fileupload = require("express-fileupload");

var session = require('express-session');

const app = express();
const server = http.createServer(app);
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('trust proxy', 1);
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(express.static(path.join(__dirname, "javascript")));
app.use(express.static(__dirname + '/public'));
app.use(fileupload());

const userController = require("./controllers/userController");
const galeryController = require("./controllers/galeryController");

app.get("/", (req, res) => {res.redirect("/galery")});
app.get("/index", (req, res) => {res.redirect("/galery")});

app.route("/login")
    .get(userController.login)
    .post(urlencodedParser, userController.loginEval);

app.route("/logout")
    .get(userController.logout);

app.route("/galery")
    .get(galeryController.galery);

// app.route("/galery/:id")
//     .get(galeryController.galeryDetail);

app.route("/contact")
    .get(galeryController.contact)
    .post(urlencodedParser, galeryController.contactEval);

app.route("/new-image")
    .get(galeryController.newImage)
    .post(urlencodedParser, galeryController.newImageEval);

const socketio = require("socket.io");

const io = new socketio.Server(server);

io.on("connection", function(socket) {
    console.log("Established connection with client.");

    socket.on("disconnect", function(socket) {
        console.log("Disconnected from client.");
    });

    socket.on("getGallery", function() {
        console.log("Client requested gallery.");
        socket.emit("gotGallery", galery);
    });

});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});