const { execSync } = require("child_process");

// Run some command
const runCommandSync = (cmd) => {
  console.log(`\x1b[33m
=> ${cmd}
\x1b[0m`);
  // return
  execSync(cmd, {stdio: 'inherit'})
};

module.exports = {
  runCommand: runCommandSync,
};
