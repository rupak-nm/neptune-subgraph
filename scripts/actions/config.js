const path = require("path");
const fs = require("fs");

const getConfig = (network) => {
  if (!network) return null;

  const configFilePath = path.resolve(
    __dirname,
    `../../config/${network}.json`
  );

  let config = null;
  try {
    if (fs.existsSync(configFilePath)) {
      const configText = fs.readFileSync(configFilePath, "utf8");
      config = JSON.parse(configText);
    }
  } catch (err) {
    console.log("Error: Config file does not exist");
    process.exit(0);
  }

  return config;
};

module.exports = {
  getConfig,
};
