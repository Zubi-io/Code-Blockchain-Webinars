var Web3 = require('xdc3');

web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.apothem.network"));
const account = web3.eth.accounts.create(['qwerqwerl;kja;df']);
console.log(account)

// const wallet = web3.eth.accounts.wallet.create(5)
// console.log(wallet)
// Keystore - 

web3.eth.getBalance(account['address'])
.then((log) => {
    console.log('Current Account Balance', log)
});
