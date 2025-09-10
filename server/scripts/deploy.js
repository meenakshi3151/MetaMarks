const hre = require("hardhat");

async function main() {
  const CPICalculator = await hre.ethers.getContractFactory("CPICalculator");
  const cpiCalculator = await CPICalculator.deploy();

  await cpiCalculator.waitForDeployment(); // ✅ new way in ethers v6

  console.log("CPICalculator deployed to:", await cpiCalculator.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
