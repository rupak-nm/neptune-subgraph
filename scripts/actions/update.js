const { getParsedArgs } = require("./args");
const { runCommand } = require("./command");
const { getConfig } = require("./config");
const { createManifest } = require("./manifest");

const updateManifestFile = () => {
  const args = getParsedArgs();

  if (!args.network) {
    args.network = "fuji";
  }

  const config = getConfig(args?.network);

  createManifest(config);

  return config;
};

module.exports = {
  updateManifestFile,
};
