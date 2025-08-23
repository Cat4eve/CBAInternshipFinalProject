const libxmljs = require("libxmljs2");
const fs = require("fs");
const { j2xParser } = require("fast-xml-parser"); // To convert object back to XML

const xsdData = fs.readFileSync("MODS.xsd", "utf8");
const xsdDoc = libxmljs.parseXml(xsdData);

function objectToXml(obj) {
  const parser = new j2xParser({
    ignoreAttributes: false,
    format: true,
  });
  return parser.parse(obj);
}

export function validateRecord(record) {
  try {
    const xmlString = objectToXml({ mods: record }); // wrap in <mods> root
    const xmlDoc = libxmljs.parseXml(xmlString);

    const valid = xmlDoc.validate(xsdDoc);
    if (valid) {
      console.log("XML is valid ✅");
      return true;
    } else {
      console.error("XML is invalid ❌");
      console.error(xmlDoc.validationErrors);
      return false;
    }
  } catch (err) {
    console.error("Parsing/Validation error:", err);
    return false;
  }
}