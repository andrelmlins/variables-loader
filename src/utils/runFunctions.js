'use strict';

const runFunctions = obj => {
  Object.keys(obj).map(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key]();
    }
  });

  return obj;
};

module.exports = runFunctions;
