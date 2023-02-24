const getParsedArgs = () => {
  const fullArgs = process.argv;
  const args = fullArgs.slice(2);

  const parsedArgs = {};
  for (const iterator of args) {
    if (iterator.includes("=")) {
      const [key, value] = iterator.split("=");
      parsedArgs[key] = value.trim();
    }
  }

  return parsedArgs;
};

module.exports = { getParsedArgs };
