const express = require("express");
const docRouter = require("./docs/doc.routes");

const api = express.Router();

api.get("/", (req, res) => res.send("<h1>APIs are working...</h1>"));
// Doc
api.use("/docs", docRouter);

module.exports = api;
