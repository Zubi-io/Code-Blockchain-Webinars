const axios = require("axios");

const thash =
  "0x5307ab644a3fe4fc0ada512a9cad935e496daff4740662e0fa7b26d4cc2cef8b";

var data = JSON.stringify({
  "jsonrpc": "2.0",
  "method": "eth_getTransactionByHash",
  "params": [
    thash
  ],
  "id": 1
});
axios
  .post("https://rpc.apothem.network//getTransactionByHash", data, {
    headers: {
      "content-type": "application/json",
    },
  })
  .then((json) => {
    console.log("Transaction Is");
    console.log(parseInt(json.data.result.value) / 10 ** 18);
  })
  .catch((error) => {
    console.log(error);
  });
