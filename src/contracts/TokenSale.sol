// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TokenSale is Ownable, ReentrancyGuard {
    IERC20 public token;
    uint256 public tokenPrice;
    uint256 public minPurchase;
    uint256 public maxPurchase;
    uint256 public totalSold;
    bool public saleActive;
    
    mapping(address => uint256) public purchases;
    
    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event PriceUpdated(uint256 newPrice);
    event SaleStatusUpdated(bool active);
    
    constructor(
        address _token,
        uint256 _tokenPrice,
        uint256 _minPurchase,
        uint256 _maxPurchase
    ) {
        token = IERC20(_token);
        tokenPrice = _tokenPrice;
        minPurchase = _minPurchase;
        maxPurchase = _maxPurchase;
        saleActive = true;
    }
    
    function buyTokens() external payable nonReentrant {
        require(saleActive, "Sale is not active");
        require(msg.value >= minPurchase, "Below minimum purchase amount");
        require(msg.value <= maxPurchase, "Exceeds maximum purchase amount");
        
        uint256 tokenAmount = (msg.value * (10**18)) / tokenPrice;
        require(token.balanceOf(address(this)) >= tokenAmount, "Insufficient tokens in contract");
        
        purchases[msg.sender] += tokenAmount;
        totalSold += tokenAmount;
        
        require(token.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        emit TokensPurchased(msg.sender, tokenAmount, msg.value);
    }
    
    function updatePrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Invalid price");
        tokenPrice = _newPrice;
        emit PriceUpdated(_newPrice);
    }
    
    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
        emit SaleStatusUpdated(saleActive);
    }
    
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    function withdrawUnsoldTokens() external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner(), balance), "Token withdrawal failed");
    }
    
    receive() external payable {
        buyTokens();
    }
}