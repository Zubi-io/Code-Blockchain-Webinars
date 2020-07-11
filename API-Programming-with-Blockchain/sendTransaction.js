const Web3 = require("xdc3");
const axios = require("axios");

const account1 = "0xf118AFc0B682D07a6CD369103D3b3C205de619EE";
const account1Priv =
  "0xa88e55b995e74df0c1fe93be1bb151f15039e168cf2cbff5c17ea12cf7dc61fb";
const account2 = "0x674F8cB11baf6e239C407720222a822Ea3B715B7";

web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.apothem.network"));

let nonce;

//Getting Nonce from account
web3.eth.getTransactionCount(account1).then((addressNonce) => {
  nonce = addressNonce;
});

// Sign Transaction using Private key of the User
web3.eth.accounts.signTransaction(
    {
      nonce: nonce,
      from: account1,
      to: account2,
      value: 1000000000000000000,
      gas: 31000,
      gasPrice: 2500,
    },
    account1Priv
  )
  .then((resp) => {
    console.log(resp);

    // web3.eth.sendSignedTransaction(resp.rawTransaction).then((hash) => {
    //   console.log(hash);
    // });

    //Send Signed Transaction to Xinfin using POST request
    var data = JSON.stringify({
      jsonrpc: "2.0",
      method: "eth_sendRawTransaction",
      params: [resp.rawTransaction],
      id: 1,
    });

    axios
      .post("https://rpc.apothem.network//sendRawTransaction", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((json) => {
        console.log("Transaction Is");
        console.log(json.data);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch(console.log);
