const axios = require("axios");

let data = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_getBalance",
  params: ["0x6D287acF219b5a1d2F1d83B77d2Dfa79dF14c4aE", "latest"],
  id: 1,
});

axios
  .post("https://rpc.apothem.network//getBalance", data, {
    headers: {
      "content-type": "application/json",
    },
  })
  .then((json) => {
    console.log(json.data);
    console.log("Account Balance is", parseInt(json.data.result) / 10 ** 18);
  })
  .catch((error) => {
    console.log(error);
  });
