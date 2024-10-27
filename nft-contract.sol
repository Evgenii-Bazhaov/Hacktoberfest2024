// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SimpleNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Events
    event NFTMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event NFTTransferred(address indexed from, address indexed to, uint256 indexed tokenId);
    event NFTBurned(uint256 indexed tokenId);

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {
        // The msg.sender is passed as the owner during contract deployment
    }

    /**
     * @dev Mint a new NFT
     * @param recipient Address that will receive the minted NFT
     * @param tokenURI URI of the token metadata
     */
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit NFTMinted(recipient, newItemId, tokenURI);
        return newItemId;
    }

    /**
     * @dev Transfer an NFT from the caller's address to another address
     * @param to Address that will receive the NFT
     * @param tokenId ID of the token to be transferred
     */
    function transferNFT(address to, uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT.");
        require(to != address(0), "Cannot transfer to the zero address.");

        _transfer(msg.sender, to, tokenId);
        emit NFTTransferred(msg.sender, to, tokenId);
    }

    /**
     * @dev Burn an NFT (permanently remove it from existence)
     * @param tokenId ID of the token to be burned
     */
    function burnNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT.");
        
        _burn(tokenId);
        emit NFTBurned(tokenId);
    }

    /**
     * @dev Get the total number of NFTs minted
     */
    function totalMinted() public view returns (uint256) {
        return _tokenIds.current();
    }
}
