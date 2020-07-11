const axios = require("axios");

const thash =
  "0x229e6d5f1a6581c92f07f9fb3aa9da42c62d56eb19636cf70439682aab6f0a66";

let data = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_getTransactionReceipt",
  params: [thash],
  id: 1,
});

axios
  .post("https://rpc.apothem.network//getTransactionReceipt", data, {
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
