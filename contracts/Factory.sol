// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import "./StandardToken.sol";

contract Factory is Ownable {
	event TokenDeployed(address indexed tokenAddress, string tokenName, string tokenSymbol);
	event UpdatedFeeReceiver(address newReceiver, address oldReceiver);

	uint256 private _taxForDeployer = 0.25 ether;
	address private _feeReceiver;

	constructor() {
		_feeReceiver = address(this);
	}

	function taxForDeployer() external view onlyOwner returns (uint256) {
		return _taxForDeployer;
	}

	function feeReceiver() external view onlyOwner returns (address) {
		return _feeReceiver;
	}

	function updateFeeReceiver(address newReceiver) external onlyOwner {
		address oldReceiver = _feeReceiver;
		_feeReceiver = newReceiver;
		emit UpdatedFeeReceiver(newReceiver, oldReceiver);
	}

	function updateTaxForDeployer(uint256 _tax) external onlyOwner {
		_taxForDeployer = _tax;
	}

	function deployToken(StandardToken.TokenInfo memory _tokenInfo) public payable {
		StandardToken token = new StandardToken(_tokenInfo, _taxForDeployer, _feeReceiver);

		emit TokenDeployed(address(token), _tokenInfo.name, _tokenInfo.symbol);
	}

	function withdraw() external payable onlyOwner {
		payable(owner()).transfer(address(this).balance);
	}

	function withdrawToken(address tokenAddress) external onlyOwner {
		uint256 balance = IERC20(tokenAddress).balanceOf(address(this));

		IERC20(tokenAddress).transferFrom(address(this), owner(), balance);
	}

	receive() external payable {}
}
