const ganache = require("ganache");

const options = {};
const server = ganache.server(options);
const PORT = 8545;
server.listen(PORT, async err => {
    if (err) throw err;
    
const provider = server.provider;
  console.log(`ganache listening on port ${PORT}...`);
  const accounts = await provider.request({
    method: "eth_accounts",
    params: []
  });
  console.log(accounts[0])
});

// 0x3B99ace7E4C78dE73b5dC3f2E506313BE085925F