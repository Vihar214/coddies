const express = require("express");
const mySql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "coddies",
});

app.get("/", (req, res) => {
  return res.json("frmobackend");
});
app.get("/data", (req, res) => {
  const sql = "SELECT * from cpp";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

const port = 3000; // Change the port to your desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
