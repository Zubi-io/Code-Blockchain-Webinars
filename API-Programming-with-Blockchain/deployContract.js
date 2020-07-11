const Web3 = require("xdc3");
const axios = require("axios");

const account1 = "0x6D287acF219b5a1d2F1d83B77d2Dfa79dF14c4aE";
const account1Priv =
  "0xf82d94fdbb6eb88134835743510045ce397cf8edd6f61ff28bd5e42790defb42";
const account2 = "0xC5261f5A5f244efEFb08FF2b11Ced6124006083B";

web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.apothem.network"));

let nonce;

web3.eth.getTransactionCount(account1)
.then((addressNonce) => {
    nonce = addressNonce
})
const abi = '[{"constant":false,"inputs":[{"name":"_x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]'
const byteCode = '608060405234801561001057600080fd5b5060da8061001f6000396000f3fe6080604052348015600f57600080fd5b5060043610604f576000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11460545780636d4ce63c14607f575b600080fd5b607d60048036036020811015606857600080fd5b8101908080359060200190929190505050609b565b005b608560a5565b6040518082815260200191505060405180910390f35b8060008190555050565b6000805490509056fea165627a7a72305820f5b45257c295b2fcc0d1fa8abbce11351d4d1b1fe39546f9749b4c78603d86850029'


const contract = new web3.eth.Contract(JSON.parse(abi));

let encodedDeploy;

encodedDeploy = contract
  .deploy({
    data: byteCode,
  })
  .encodeABI();

  web3.eth.accounts
  .signTransaction(
    {
      nonce: nonce,
      gas: 310000,
      gasPrice: 2500,
      data: "0x" + encodedDeploy,
    },
    account1Priv
  )
  .then((resp) => {
    // Send the Signed Tranasction to the Blockchain
    web3.eth.sendSignedTransaction(resp.rawTransaction).then((hash) => {
      console.log(hash);
    });
  })
  .catch(console.log);