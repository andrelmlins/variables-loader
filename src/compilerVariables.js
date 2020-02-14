"use strict";

const fs = require("fs");
const jsonToDotNotate = require("./utils/jsonToDotNotate");

const compilerVariables = (path, extension) => {
  if (extension === "js") {
    return jsonToDotNotate(require(path)());
  } else {
    return jsonToDotNotate(fs.readFileSync(path));
  }
};

module.exports = compilerVariables;
