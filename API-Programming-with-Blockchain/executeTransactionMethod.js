const Web3 = require("xdc3");

const account1 = "0x6D287acF219b5a1d2F1d83B77d2Dfa79dF14c4aE";
const account1Priv =
  "0xf82d94fdbb6eb88134835743510045ce397cf8edd6f61ff28bd5e42790defb42";
const contractAddress = "xdc620C60646e9DD386a61f2d91583163B89E97bd72";

web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.apothem.network"));

let nonce;

web3.eth.getTransactionCount(account1).then((addressNonce) => {
  nonce = addressNonce;
});

const abi =
  '[{"constant":false,"inputs":[{"name":"_x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]';

const contract = new web3.eth.Contract(JSON.parse(abi), contractAddress);

contract.methods
  .get()
  .call()
  .then((value) => {
    console.log("x Value is ", value);
  });

console.log("Setting x Value to 131231");
const encodedSet = contract.methods.set(131231).encodeABI();
console.log(encodedSet);
web3.eth.accounts
  .signTransaction(
    {
      nonce: nonce,
      to: contractAddress,
      gas: 3100000,
      gasPrice: 2500,
      data: encodedSet,
    },
    account1Priv
  )
  .then((resp) => {
    // Send the Signed Tranasction to the Blockchain
    web3.eth
      .sendSignedTransaction(resp.rawTransaction)
      .then((hash) => {
        console.log(hash);
        contract.methods
          .get()
          .call()
          .then((value) => {
            console.log("New x Value", value);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch(console.log);
