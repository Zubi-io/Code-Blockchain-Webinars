const axios = require("axios");

const account1 = "0xd07465c4F730EB6F059e53b404C499aD7e5e7838";

var data = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_getBalance",
  params: [account1, "latest"],
  id: 1,
});

axios
  .post("https://rpc.apothem.network/getBalance", data, {
    headers: {
      "content-type": "application/json",
    },
  })
  .then((json) => {
    console.log("Transaction Is");
    console.log(json.data);
    console.log(parseInt(json.data.result) / 10 ** 18);
  })
  .catch((error) => {
    console.log(error);
  });
