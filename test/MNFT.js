const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

require('dotenv').config();

const name = 'M NFT';
const symbol = 'MNFT';
const tokenURI = process.env.TOKEN_URI;
const mintingStartTime = new Date(process.env.START_TIME).getTime() / 1000;
const mintingEndTime = new Date(process.env.END_TIME).getTime() / 1000;
const maxMintLimit = 2;

describe("NFT", function () {
  async function deployNFTFixture() {
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("MNFT");
    const nft = await NFT.deploy(name, symbol, tokenURI, mintingStartTime, mintingEndTime, maxMintLimit);

    return { nft, owner, otherAccount1, otherAccount2 };
  }

  describe("Deployment", function () {
    it("Should set the right tokenURI", async function () {

      const { nft } = await loadFixture(deployNFTFixture);

      expect(await nft.getTokenURI()).to.equal(tokenURI);
    });

    it("Should set the right maxMintLimit", async function () {
        
        const { nft } = await loadFixture(deployNFTFixture);
  
        expect(await nft.maxMintLimit()).to.equal(maxMintLimit);
    });
    
  });

  describe("Minting", function () {
    it("Should mint an NFT", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      await time.increaseTo(mintingStartTime + 1);

      const tokenId = 0;

      const result = await nft.connect(owner).mint();

      await result.wait();

      const nftOwner = await nft.ownerOf(tokenId);

      expect(nftOwner).to.equal(owner.address);
    });

    it("Should mint the right amount of tokens", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      await time.increaseTo(mintingStartTime + 1);

      await nft.connect(owner).mint();

      expect(await nft.balanceOf(owner.address)).to.equal(1);
    });

    it("Should revert if same wallet minting twice", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      await time.increaseTo(mintingStartTime + 1);

      await nft.connect(owner).mint();

      await expect(nft.connect(owner).mint()).to.be.revertedWith(
        "You can only mint one NFT per wallet"
      );
    });

    it("Should revert if minting more than maxMintLimit", async function () {
      const { nft, owner, otherAccount1, otherAccount2 } = await loadFixture(deployNFTFixture);

      await time.increaseTo(mintingStartTime + 1);

      await nft.connect(owner).mint();

      await nft.connect(otherAccount1).mint();

      await expect(nft.connect(otherAccount2).mint()).to.be.revertedWith(
        "The maximum number of NFTs has already been minted"
      );
    });

    it("Should revert if minting before mintingStartTime", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      await expect(nft.connect(owner).mint()).to.be.revertedWith(
        "Minting period has not started yet"
      );
    });

    it("Should revert if minting after mintingEndTime", async function () {
      const { nft, owner } = await loadFixture(deployNFTFixture);

      await time.increaseTo(mintingEndTime + 1);

      await expect(nft.connect(owner).mint()).to.be.revertedWith(
        "Minting period has ended"
      );
    });

  });
});