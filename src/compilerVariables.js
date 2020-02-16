"use strict";

const fs = require("fs");
const jsonToDotNotate = require("./utils/jsonToDotNotate");

const compilerVariables = (path, extension) => {
  if (extension === "js") {
    const fileConfig = require(path);

    if (typeof fileConfig === "function") {
      return jsonToDotNotate(fileConfig());
    }

    return jsonToDotNotate(fileConfig);
  } else {
    return jsonToDotNotate(fs.readFileSync(path));
  }
};

module.exports = compilerVariables;
