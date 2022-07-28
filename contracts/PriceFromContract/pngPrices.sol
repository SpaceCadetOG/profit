// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.6.12;
import "@pangolindex/exchange-contracts/contracts/pangolin-periphery/libraries/PangolinLibrary.sol";

import "@pangolindex/exchange-contracts/contracts/pangolin-core/interfaces/IPangolinPair.sol";
import "@pangolindex/exchange-contracts/contracts/pangolin-core/interfaces/IPangolinFactory.sol";

contract PNGPrices {
    address private PNG_FACTORY = 0xefa94DE7a4656D787667C749f7E1223D71E9FD88;

    function getPairAddress(address tokenA, address tokenB)
        external
        view
        returns (address pairAddress)
    {
        // function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair);
        pairAddress = PangolinLibrary.pairFor(PNG_FACTORY, tokenA, tokenB);
        return pairAddress;
    }

    // call this firs

    function getReserves(address tokenA, address tokenB)
        external
        view
        returns (uint reserveA, uint reserveB)
    {
        (reserveA, reserveB) = PangolinLibrary.getReserves(
            PNG_FACTORY,
            tokenA,
            tokenB
        );
        return (reserveA, reserveB);
    }

    // call 2

    // call 3 => Useful for calculating optimal token amounts before calling swap.
    function getJoeSwap(
        uint amountA,
        uint reserveA,
        uint reserveB
    ) external returns (uint256) {
        // Useful for calculating optimal token amounts before calling
        // function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB);
    }
}
