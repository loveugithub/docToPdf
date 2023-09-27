const express = require("express");
const { createPdfV1, createPdfV2, createPdf } = require("./doc.controller");

const docRouter = express.Router();

docRouter.post("/", createPdf);

module.exports = docRouter;
