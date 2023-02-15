// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

require('dotenv').config();

async function main() {
  const name = 'M NFT';
  const symbol = 'MNFT';
  const tokenURI = process.env.TOKEN_URI;
  const mintingStartTime = new Date(process.env.START_TIME).getTime() / 1000;
  const mintingEndTime = new Date(process.env.END_TIME).getTime() / 1000;
  const maxMintLimit = process.env.MAX_MINT_LIMIT;

  // We get the contract to deploy
  const NFT = await hre.ethers.getContractFactory("MNFT");
  const nft = await NFT.deploy(name, symbol, tokenURI, mintingStartTime, mintingEndTime, maxMintLimit);

  await nft.deployed();

  console.log("NFT deployed to:", nft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
