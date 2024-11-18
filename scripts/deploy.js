const hre = require("hardhat");

async function main() {
  try {
    // Get the contract factory
    const ClaimBNBAirDrop = await hre.ethers.getContractFactory("ClaimBNBAirDrop");
    
    console.log("Deploying ClaimBNBAirDrop...");
    const claimBNB = await ClaimBNBAirDrop.deploy();
    
    console.log("Waiting for deployment...");
    await claimBNB.waitForDeployment();
    
    const address = await claimBNB.getAddress();
    console.log("ClaimBNBAirDrop deployed to:", address);
    
    // Wait for a few block confirmations
    console.log("Waiting for block confirmations...");
    await claimBNB.deploymentTransaction().wait(5);
    
    // Verify the contract
    console.log("Verifying contract on BscScan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: []
      });
      console.log("Contract verified successfully");
    } catch (error) {
      console.error("Verification error:", error.message);
    }
  } catch (error) {
    console.error("Deployment failed:", error.message);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });