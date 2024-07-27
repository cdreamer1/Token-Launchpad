require("hardhat");

async function main() {
	const StandardToken = await ethers.getContractFactory('StandardToken');
	const StandardTokenDeployed = await StandardToken.deploy(
		{
			name: "WLIStandardToken",
			symbol: "WLI",
			marketingFeeReceiver: "0x562461317d060ef040e6c4b1aea362F2b2Af823e",
			devFeeReceiver: "0x562461317d060ef040e6c4b1aea362F2b2Af823e",
			marketingTaxBuy: "500000000000000000",
			marketingTaxSell: "500000000000000000",
			devTaxSell: "500000000000000000",
			devTaxBuy: "500000000000000000",
			lpTaxBuy: "500000000000000000",
			lpTaxSell: "500000000000000000",
			totalSupply: "100000000000000000000000000",
			maxPercentageForWallet: "5000000000000000000",
			maxPercentageForTx: "5000000000000000000",
			swapRouter: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
			newOwner: "0x562461317d060ef040e6c4b1aea362F2b2Af823e"
		},
		"250000000000000000",
		"0x562461317d060ef040e6c4b1aea362F2b2Af823e", 
		{ gasLimit: 1500000 }
	);
	await StandardTokenDeployed.waitForDeployment();
  
	console.log("StandardToken contract deployed at:", StandardTokenDeployed.target);
}
  
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
