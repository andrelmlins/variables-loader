'use strict';

const runFunctions = obj => {
  Object.keys(obj).map(key => {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key]();
    }
  }, target);

  return obj;
};

module.exports = runFunctions;
