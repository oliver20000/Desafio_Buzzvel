const axios = require("axios");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const qrcode = require("qrcode");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const entries = [];

app.post("/entries", (req, res) => {
  const { name, linkedin, github, phone } = req.body;
  const userId = name + "_" + phone;
  entries.push({ name, linkedin, github, phone, id: userId });
  res.status(201).json({ name, phone, userId }); // retornar userId como propriedade do objeto JSON
});

app.get("/entries", (req, res) => {
  res.json(entries);
});

app.get("/generator", (req, res) => {
  res.render("generator");
});

app.get("/johnPage/:userId", (req, res) => {
  const { userId } = req.params;
  res.render("johnPage", { userId });
});

app.get("/qrcode/:value", async (req, res) => {
  const { value } = req.params;
  const qrCode = await qrcode.toBuffer(value);
  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Disposition": `attachment; filename="qrcode.png"`,
  });
  res.end(qrCode);
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

const fetchEntries = async () => {
  const response = await axios.get("http://localhost:3001/entries");
  console.log(response.data);
};
module.exports = { fetchEntries };
