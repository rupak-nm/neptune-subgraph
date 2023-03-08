const { getParsedArgs } = require("./args");
const { getConfig } = require("./config");
const { createManifest } = require("./manifest");

const updateManifestFile = () => {
  const args = getParsedArgs();

  if (!args.config) {
    args.config = "mumbai";
  }

  const config = getConfig(args?.config);

  createManifest(config);

  return config;
};

module.exports = {
  updateManifestFile,
};
