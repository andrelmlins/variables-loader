"use strict";

const jsonToDotNotate = (obj, target = {}, prefix) =>
  Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object") {
      if (prefix) {
        return jsonToDotNotate(obj[key], acc, prefix + "." + key);
      }

      return jsonToDotNotate(obj[key], acc, key);
    }

    if (prefix) {
      acc[prefix + "." + key] = obj[key];
      return acc;
    }

    acc[key] = obj[key];
    return acc;
  }, target);

module.exports = jsonToDotNotate;
