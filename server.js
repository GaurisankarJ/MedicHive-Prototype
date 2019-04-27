const express = require("express");
const fs = require("fs");
const axios = require("axios");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
    });
    console.log(log);
    next();
});

app.get("/", (req, res) => {
    axios({
        method: "get",
        url: "https://medic-hive-server.herokuapp.com/",
    }).then(() => {
        res.sendFile(__dirname + "/index.html");
    }).catch((err) => {
        console.log(err);
        res.status(404).send();
    });
});

app.get("/public/images/homepage-illustration.png", (req, res) => {
    res.sendFile(__dirname + "/public/images/homepage-illustration.png");
});

var listener = app.listen(port, () => {
    console.log(`Server listening on port ${listener.address().port}!`);
});