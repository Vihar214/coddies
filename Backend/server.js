const express = require("express");
const mySql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const compiler = require("compilex");

// Database setup
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

//compilex setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var option = { stats: true };
compiler.init(option);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/compilecode", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var inputRadio = req.body.inputRadio;
  var lang = req.body.lang;
  compiler.flush(() => {
    console.log("All temporary files flushed!");
    if (lang === "C" || lang === "C++") {
      var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
      if (inputRadio === "true") {
        compiler.compileCPPWithInput(envData, code, input, function (data) {
          if (data.error) {
            res.send({ error: data.error });
          } else {
            res.send({ output: data.output });
          }
        });
      } else {
        compiler.compileCPP(envData, code, function (data) {
          res.send(data);
        });
      }
    }

    if (lang === "Python") {
      var envData = { OS: "windows" };
      if (inputRadio === "true") {
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          res.send(data);
        });
      } else {
        compiler.compilePython(envData, code, function (data) {
          res.send(data);
        });
      }
    }
  });
});

app.get("/fullStat", function (req, res) {
  compiler.fullStat(function (data) {
    res.send(data);
  });
});

compiler.flush(function () {
  console.log("All temporary files flushed !");
});

//Port setting
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
