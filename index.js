const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

mongoose.connect(
  "mongodb+srv://saurabhmahajanq:OCy203XCkwIDyLM8@test-todolist.rjdfvs8.mongodb.net/?retryWrites=true&w=majority&appName=test-todolist"
);
const trySchema = new mongoose.Schema({
  name: String,
});

const item = mongoose.model("task", trySchema);

app.get("/", async function (req, res) {
  try {
    const foundItems = await item.find({});
    res.render("list", { exes: foundItems });
  } catch (error) {
    console.error("error fetching items:", error);
  }
});

app.listen("3000", function () {
  console.log("server is running");
});

app.post("/", async function (req, res) {
  const element = req.body.ele1;

  const handleelement = req.body.ele1?.trim();

  if (element && handleelement) {
    const todoo = new item({ name: element });
    await todoo.save();
    res.redirect("/");
  } else {
    console.log("empty string not allowed");
    res.redirect("/"); //validation. Otherwise the page keeps reloading if we don't provide the priority value
  }
});

app.post("/delete", async function (req, res) {
  const deleted = req.body.del;
  await item.findByIdAndDelete(deleted);
  res.redirect("/");
});

app.put("/update", async function (req, res) {
  const id = req.body.id;
  const newpara = req.body.data;

  await item.findByIdAndUpdate(id, { name: newpara });
  res.status(200).json({ message: "Update successful" });
});
