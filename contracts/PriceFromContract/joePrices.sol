// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.6.12;
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoePair.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoeFactory.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/libraries/JoeLibrary.sol";

contract JoePrices {
    address private JOE_FACTORY = 0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10;

    function getPairAddress(address tokenA, address tokenB)
        external
        view
        returns (address pairAddress)
    {
        // function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair);
       pairAddress =  JoeLibrary.pairFor(JOE_FACTORY, tokenA, tokenB);
        return pairAddress;
    }

    // call this firs

    function getReserves(address tokenA, address tokenB)
        external
        view
        returns (uint reserveA, uint reserveB)
    {
        
        (reserveA, reserveB) = JoeLibrary.getReserves(JOE_FACTORY, tokenA, tokenB);
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
