const express = require("express");
const bodyParser = require("body-parser");

var app = express();
var items = [];
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

var example = "working";
app.get("/", function (req, res) {
  res.render("list", { exes: items });
});

app.post("/", function (req, res) {
  var item = req.body.ele1;
  items.push(item);
  res.redirect("/");
});

app.listen(8000, function () {
  console.log("Server Started");
});
