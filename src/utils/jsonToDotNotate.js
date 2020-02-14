"use strict";

const jsonToDotNotate = (obj, target, prefix) =>
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === "object") {
      if (prefix) {
        return jsonToDotNotate(obj[key], target, prefix + "." + key);
      }

      return jsonToDotNotate(obj[key], target, key);
    } else if (prefix) {
      return (target[prefix + "." + key] = obj[key]);
    } else {
      return (target[key] = obj[key]);
    }
  });

module.exports = jsonToDotNotate;
