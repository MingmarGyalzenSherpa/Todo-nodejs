//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
//init
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const APP_PORT = process.env.PORT || 8000;

//routes

let todos = [
  {
    todo: "go college",
    completed: false,
  },
  {
    todo: "eat lunch",
    completed: true,
  },
  {
    todo: "go jogging",
    completed: false,
  },
  {
    todo: "go swimming",
    completed: true,
  },
];

app.get("/", (req, res) => {
  res.render("index", { items: todos });
});

app.post("/add-todo", (req, res) => {
  todos.push({ todo: req.body.todo, completed: false });
  console.log(todos);
  res.redirect("/");
});

app.post("/remove-todo", (req, res) => {
  const index = req.body.delete;
  todos.splice(index, 1);
  res.redirect("/");
});

//server activation
app.listen(APP_PORT, () => {
  console.log("Server running at ", APP_PORT);
});
