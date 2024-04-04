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
app.get("/cdata", (req, res) => {
  const sql = "SELECT * from c";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/cppdata", (req, res) => {
  const sql = "SELECT * from cpp";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.get("/pythondata", (req, res) => {
  const sql = "SELECT * from python";
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

// pdf

const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
app.post("/generatepdf", async (req, res) => {
  const { code, input, output } = req.body;
  const existingPdfBytes = fs.readFileSync("Practical.pdf");
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  let pageIndex = 0; // Start with the first page of the existing PDF
  let page = pdfDoc.getPages()[pageIndex];
  const fontSize = 12;
  const codeLines = code.split("\n");
  const outputLines = output.split("\n");

  let y = 700;
  let textExceedsPage = false;

  for (let line of codeLines) {
    if (y < 90 || textExceedsPage) {
      // Move to the next page if the text exceeds the current page height or if it exceeded in the previous loop
      pageIndex++;
      if (pageIndex >= pdfDoc.getPageCount()) {
        // Add a new page if there are no more pages in the PDF
        page = pdfDoc.addPage();
      } else {
        page = pdfDoc.getPages()[pageIndex];
      }
      y = 700; // Reset y-coordinate for the new page
      textExceedsPage = false;
    }
    y -= 20; // Adjust as needed for line spacing
    page.drawText(line, { x: 50, y, size: fontSize });

    // Check if the text exceeds the page height
    if (page.getHeight() - y < 20) {
      textExceedsPage = true;
    }
  }
  if (y < 90 || textExceedsPage) {
    // Move to the next page if the text exceeds the current page height or if it exceeded in the previous loop
    pageIndex++;
    if (pageIndex >= pdfDoc.getPageCount()) {
      // Add a new page if there are no more pages in the PDF
      page = pdfDoc.addPage();
    } else {
      page = pdfDoc.getPages()[pageIndex];
    }
    y = 700; // Reset y-coordinate for the new page
    textExceedsPage = false;
  }
  // Add some space between code and output
  y -= 50; // Add some space between code and output
  page.drawText("Output:", { x: 50, y });
  y -= 20; // Move the y-coordinate up after "Output:" text

  for (let line of outputLines) {
    if (y < 90 || textExceedsPage) {
      // Move to the next page if the text exceeds the current page height or if it exceeded in the previous loop
      pageIndex++;
      if (pageIndex >= pdfDoc.getPageCount()) {
        // Add a new page if there are no more pages in the PDF
        page = pdfDoc.addPage();
      } else {
        page = pdfDoc.getPages()[pageIndex];
      }
      y = 700; // Reset y-coordinate for the new page
      textExceedsPage = false;
    }
    y -= 20; // Adjust as needed for line spacing
    page.drawText(line, { x: 50, y, size: fontSize });

    // Check if the text exceeds the page height
    if (page.getHeight() - y < 20) {
      textExceedsPage = true;
    }
  }
  const totalPages = pdfDoc.getPageCount();
  for (let i = pageIndex + 1; i < totalPages; i++) {
    pdfDoc.removePage(pageIndex + 1);
  }
  fs.writeFileSync(
    "C:/Users/vihar/OneDrive/Desktop/o.pdf",
    await pdfDoc.save()
  );

  res.status(200).send("PDF generated successfully");
});
