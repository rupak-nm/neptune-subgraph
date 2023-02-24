const path = require("path");
const fs = require("fs");

const getReplacedString = (stringWithPlaceholders = "", replacements) => {
  const str = stringWithPlaceholders.replace(
    /{\w+}/g,
    (placeholder) =>
      replacements[placeholder.substring(1, placeholder.length - 1)] ||
      placeholder
  );

  return str;
};

const createManifest = (config) => {
  if (!config) {
    console.log("Error: Config is invalid");
    process.exit(0);
  }

  const templateFilePath = path.resolve(__dirname, `../template.yaml`);
  const manifestFilePath = path.resolve(__dirname, `../../subgraph.yaml`);

  let manifestContent = null;
  try {
    if (fs.existsSync(templateFilePath)) {
      const templateContent = fs.readFileSync(templateFilePath, "utf8");
      manifestContent = getReplacedString(templateContent, config);
    }
  } catch (err) {
    console.log("Error: Template file does not exist");
    process.exit(0);
  }

  try {
    fs.writeFileSync(manifestFilePath, manifestContent);
    //file written successfully
  } catch (err) {
    console.log("Error: Could not create manifest", manifestFilePath);
    process.exit(0);
  }
};

module.exports = {
  createManifest,
};
