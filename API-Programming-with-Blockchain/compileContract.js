solc = require("solc");
var fs = require("fs");

const input = {
  language: "Solidity",
  sources: {
    "Basic.sol": {
      content: fs.readFileSync("Basic.sol", "utf-8"),
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

let byteCode;
let abi;

const output = JSON.parse(solc.compile(JSON.stringify(input)));

for (var contractName in output.contracts["Basic.sol"]) {
  byteCode = output.contracts["Basic.sol"][contractName].evm.bytecode.object;
  abi = output.contracts["Basic.sol"][contractName].abi;
  console.log('ByteCode : ' + byteCode);
  console.log('ABI : ' + JSON.stringify(abi));
}
