const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "src")))

app.get("/js-compose.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "src", "js-compose.js"))
})

app.get("/js-compose.min.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "src", "js-compose.min.js"))
})


app.listen(80, () => {
    console.log("Server running on port :80")
})