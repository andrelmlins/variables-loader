const { getOptions } = require("loader-utils");
const resolverPath = require("./utils/resolverPath");
const compilerVariables = require("./compilerVariables");

module.exports = source => {
  const options = getOptions(this) || {
    fileName: "environments",
    extension: "js"
  };

  const pathFileVariables = resolverPath(
    `${options.fileName}.${options.extension}`
  );

  const variables = compilerVariables(pathFileVariables, options.extension);

  if (source.search(/\[\[([^\[\[\]\]]+)\]\]/) > 0) {
    Object.keys(variables).forEach(key => {
      const reg = new RegExp(
        /\[\[/.source + key.replace("$", "") + /\]\]/.source,
        "g"
      );
      source = source.replace(reg, target[key]);
    });
  }

  return source;
};
