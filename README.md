# NFT Hardhat Project

This project is for develop and deploy smart contract.

Test script:

```shell
npm test
```

Run local blockchain for testing:

```shell
npx hardhat node
```

Deploy Steps:
Remember to check `.env` config before deploy

```shell
npm run compile
npm run deploy-local (deploy to local block chain to test)
npm run deploy (deploy to goerli network - please update your goerli network config in hardhat.config.js)
```

Hardhat Configuration (hardhat.config.js):

```shell
{
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
    ...
  },
  nonceManager: {
    initialNonce: 0,
  },
}
```

.env

```shell
TOKEN_URI=https://gateway.pinata.cloud/ipfs/QmYr3xqqmQU8gu6XvV3UgTNBVYVB3ergdc1JmRRDfchGaQ
START_TIME=2023-02-15T00:00:00Z
END_TIME=2023-02-24T00:00:00Z
MAX_MINT_LIMIT=5
```
