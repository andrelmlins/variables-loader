const resolverPath = require("./utils/resolverPath");
const jsonToDotNotate = require("./utils/jsonToDotNotate");
const compilerVariables = require("./compilerVariables");

module.exports = source => {
  const options = getOptions(this) || {
    fileName: "environments",
    extension: "js"
  };

  const pathFileVariables = resolverPath(
    `${options.fileName}.${options.extension}`
  );

  compilerVariables(pathFileVariables, options.extension);

  let target = {};

  jsonToDotNotate(variables, target);

  if (source.search(/\[\[([^\[\[\]\]]+)\]\]/) > 0) {
    Object.keys(target).forEach(key => {
      if (process.env.NODE_ENV === "production" && key.includes("$")) {
        const variable = key.split(".").reduce((acc, item, index) => {
          item = item.replace("$", "");
          if (index != 0) {
            acc += `${item.charAt(0).toUpperCase()}${item.slice(1)}`;
          } else {
            acc += item;
          }

          return acc;
        }, "");

        const reg = new RegExp(
          /(\"|\')\[\[/.source + key.replace("$", "") + /\]\](\"|\')/.source,
          "gm"
        );
        source = source.replace(reg, `window.${variable}`);
      } else {
        const reg = new RegExp(
          /\[\[/.source + key.replace("$", "") + /\]\]/.source,
          "g"
        );
        source = source.replace(reg, target[key]);
      }
    });

    if (source.includes("[[screens]]")) {
      const reg = new RegExp(/\[\[/.source + "screens" + /\]\]/.source, "g");
      const data = panelJson.screens.reduce((acc, item, index) => {
        acc += item.routeKey;
        if (index < panelJson.screens.length - 1) {
          acc += "|";
        }
        return acc;
      }, "");

      source = source.replace(reg, data);
    }
  }

  return source;
};
