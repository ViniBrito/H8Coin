const path = require("path");
const fs = require("fs");
const solc = require("solc");

const Eth = path.resolve(__dirname, "/eth/contracts", "h8coin.sol");
const source = fs.readFileSync(Eth, "utf8");

module.exports = solc.compile(source, 1).contracts[":h8coin"];
