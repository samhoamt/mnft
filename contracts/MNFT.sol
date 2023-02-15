// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MNFT is ERC721 {
    // tokenURI
    string private _tokenURI;
    // token id counter
    uint256 private _tokenIdCounter;
    // The timestamp of the start of the minting period
    uint256 private _mintingStartTime;

    // The timestamp of the end of the minting period
    uint256 private _mintingEndTime;

    // The maximum number of NFTs that can be minted
    uint256 public maxMintLimit;

    uint256 public totalMinted;

    mapping (address => bool) private _hasMinted;

    constructor(string memory name, string memory symbol, string memory tokenURI, uint256 mintingStartTime, uint256 mintingEndTime, uint256 _maxMintLimit)
        ERC721(name, symbol)
    {
        _mintingStartTime = mintingStartTime;
        _mintingEndTime = mintingEndTime;
        maxMintLimit = _maxMintLimit;
        _tokenURI = tokenURI;
    }

    function mint() public {
        require(block.timestamp >= _mintingStartTime, "Minting period has not started yet");
        require(block.timestamp <= _mintingEndTime, "Minting period has ended");
        require(!_hasMinted[msg.sender], "You can only mint one NFT per wallet");
        require(totalMinted < maxMintLimit, "The maximum number of NFTs has already been minted");
        
        _hasMinted[msg.sender] = true;
        
        uint256 newTokenId = _tokenIdCounter;
        _tokenIdCounter++;
        _safeMint(msg.sender, newTokenId);
        emit Minted(msg.sender, newTokenId);
        totalMinted++;
    }

    function getTokenURI() public view returns (string memory){
        return _tokenURI;
    }

    event Minted(address indexed owner, uint256 tokenId);

}