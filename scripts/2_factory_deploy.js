require("hardhat");

async function main() {
	const Factory = await ethers.getContractFactory('Factory');
	const FactoryDeployed = await Factory.deploy();
	await FactoryDeployed.waitForDeployment();
  
	console.log("Factory contract deployed at:", FactoryDeployed.target);
}
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
