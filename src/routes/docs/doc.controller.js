const fs = require("fs");
const path = require("path");

const uniqid = require("uniqid");
const PizZip = require("pizzip");
const Docxtemp = require("docxtemplater");
const docxConverter = require("docx-pdf");

const apiSecret = process.env.CONVERT_API_SECRET;
const convertapi = require("convertapi")(apiSecret);

exports.createPdf = async (req, res, next) => {
  try {
    console.log(req.body);

    const uniqueId = uniqid();
    const temp = "sample";

    const content = fs.readFileSync(
      path.resolve(__dirname, "..", "..", "template", `${temp}.docx`),
      "binary"
    );

    const zip = new PizZip(content);

    const doc = new Docxtemp(zip);

    doc.render(req.body);

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    fs.writeFileSync(
      path.resolve(__dirname, "..", "..", "output", `${temp}-${uniqueId}.docx`),
      buf
    );

    const result = await convertapi.convert("pdf", {
      File: path.resolve(
        __dirname,
        "..",
        "..",
        "output",
        `${temp}-${uniqueId}.docx`
      ),
    });

    // get converted file url
    console.log("Converted file url: " + result.file.url);

    // save to file
    const file = await result.file.save(
      path.resolve(__dirname, "..", "..", "pdfs", `${temp}-${uniqueId}.pdf`)
    );

    console.log("File saved: " + file);

    res.json({
      status: "success",
      message: "working",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};
