// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.4;

interface IBUYSELL {
    // interface to search for pairs and routes

// will add total (flashswap fee + profit fee(% of profit based off difficulty) + gas + slippage(per swap)) - profit
    function PotentialProfit(
        address[] memory exchanges, 
        address[] memory assets,
        uint256 amount
    ) external returns (uint256);

    // compare chainlink prices => external api
    // Check pair price on both exchanges
    // gets prices straight from the DEX contracts
    // will sort through exchange registry to see how to swap
    function CHECK() external view returns (uint256);
    // will perform BUY swap on exchange
    // will sort through exchange registry to see how to swap
    function BUY() external;

    // will perform SELL swap on exchange
    // will sort through exchange registry to see how to swap
    function SELL() external;


    // will create exchange path route buy/sell (triangle swap too)
    // will sort through exchange registry to see how to swap
    function CREATE_ROUTE() external;

    // will find best route exchange
    // will sort through exchange registry to see how to swap
    function FIND_ROUTE() external returns (address[] memory);

    // will take the route from FIND_ROUTE() best route exchange
    // will sort through exchange registry to see how to swap
    function SET_ROUTE() external;

    // will get the best qoute exchanges to sell high on 
    // will sort through exchange registry to see how to swap
    function GET_HIGHEST_SWAP_RETURN() external;  

    // will get the best qoute exchange to buy low exchange on
    // will sort through exchange registry to see how to swap
    function GET_LOWEST_PRICE_FOR_SWAP() external;  

    // (the % cut of profit based off difficulty)
    function SET_PROFIT_FEE() external;
}
