const objHasher = require("node-object-hash");
const hasher = objHasher();

function hashObject(obj) {
  return hasher.hash(obj);
}

module.exports = { hashObject };
