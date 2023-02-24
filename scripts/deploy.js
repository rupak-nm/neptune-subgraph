const { runCommand } = require("./actions/command");
const { updateManifestFile } = require("./actions/update");

const config = updateManifestFile();

const deployCommand = `graph deploy --node https://api.thegraph.com/deploy/ ${config.deployAccount} subgraph.yaml`;
runCommand(deployCommand);
