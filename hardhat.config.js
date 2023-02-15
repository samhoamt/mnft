require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerli: {
      url: "https://goerli.infura.io/v3/a47d17bff4214ed0a2a34a71f82f13af",
      accounts: ['221bc5b0dacc11b9221fe5503343e2d90447511c52cb8d98dc809b56e398c819'],
    },
  },
  nonceManager: {
    initialNonce: 0,
  },
};
