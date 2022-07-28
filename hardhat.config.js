require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: "0.6.12" }, { version: "0.6.6" }, { version: "0.7.6" },{ version: "0.8.0" }, { version: "0.8.9" }, { version: "0.8.4" }],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 43114,
      gasPrice: 225000000000,
      forking: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        enabled: true,
      },
    },
  },
};
