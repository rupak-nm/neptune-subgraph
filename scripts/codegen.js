const { runCommand } = require("./actions/command");
const { updateManifestFile } = require("./actions/update");

updateManifestFile();
runCommand("graph codegen");
