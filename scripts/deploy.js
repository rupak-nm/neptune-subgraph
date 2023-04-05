const { runCommand } = require("./actions/command");
const { updateManifestFile } = require("./actions/update");

const { config, studio } = updateManifestFile();

const deployCommand = studio
  ? `graph deploy --node https://api.thegraph.com/deploy/ ${config.deployAccount} subgraph.yaml`
  : `graph deploy --studio ${config.deployAccount}`;

runCommand(deployCommand);
