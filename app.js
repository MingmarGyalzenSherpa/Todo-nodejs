//require
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const getConnection = require("./config/db");
//init
dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const APP_PORT = process.env.PORT || 8000;
const conn = getConnection();

//middleware
app.use((req, res, next) => {
  req.conn = conn;
  console.log("Test");
  next();
});

//routes

// let todos = [
//   {
//     todo: "go college",
//     completed: false,
//   },
//   {
//     todo: "eat lunch",
//     completed: true,
//   },
//   {
//     todo: "go jogging",
//     completed: false,
//   },
//   {
//     todo: "go swimming",
//     completed: true,
//   },
// ];

app.get("/", (req, res) => {
  const { conn } = req;
  const query = "SELECT * FROM todo";
  conn.query(query, (error, result) => {
    if (error) {
      res.status(500).send("Error ayo");
    }

    res.render("index", { items: result.rows });
  });
});

app.post("/add-todo", (req, res) => {
  // todos.push({ todo: req.body.todo, completed: false });
  const { conn } = req;
  // const query = "Insert into todo (id, title, isComplete) values ($1, $2, $3)";
  conn.query(
    "Insert into todo (title,isComplete) values ( $1, $2)",
    [req.body.todo, true],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }
      res.redirect("/");
    }
  );
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
