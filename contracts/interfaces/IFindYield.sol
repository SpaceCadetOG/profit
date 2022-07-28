// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.4;

interface IFindYield {
    // interface to search for pairs and routes

    // will add total (flashswap fee + profit fee(% of profit based off difficulty) + gas + slippage(per swap)) - profit
    function PotentialProfit(
        address[] memory exchanges,
        address[] memory assets,
        uint256 amount
    ) external returns (uint256);

    // compare chainlink prices => external api
    // Check Rates
    // gets prices straight from the DEX contracts
    // will sort through exchange registry to see how to swap
    function CHECK() external view returns (uint256);

    // will perform BUY swap on exchange
    // will sort through exchange registry to see how to swap
    function REEDEM() external;

    // will perform SELL swap on exchange
    // will sort through exchange registry to see how to swap
    function SUPPLY() external;

    // will find best route exchange
    // will sort through exchange registry to see how to swap
    function FIND_ROUTE() external returns (address[] memory);

    // will take the route from FIND_ROUTE() best route exchange
    // will sort through exchange registry to see how to swap
    function SET_ROUTE() external;

    // (the % cut of profit based off difficulty)
    function SET_PROFIT_FEE() external;
}
