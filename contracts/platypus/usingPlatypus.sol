// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

import "platypus-core/contracts/interfaces/IPriceOracleGetter.sol";
import "platypus-core/contracts/pool/Pool.sol";
import "platypus-core/contracts/oracle/ChainlinkProxyPriceProvider.sol";
import "../lib/UTILSv2.sol";
// import "../interfaces/IExchange.sol";
import "hardhat/console.sol";
contract usingPlatypus {
    // ChainlinkProxyPriceProvider public prices;
    Pool private MainUSDPool =
        Pool(0x66357dCaCe80431aee0A7507e2E361B7e2402370);

    Pool private FraxPool = Pool(0xB8E567fc23c39C94a1f6359509D7b43D1Fbed824);

    Pool private sAvaxPool = Pool(0x4658EA7e9960D6158a261104aAA160cC953bb6ba);

    Pool private MimPool = Pool(0x30C30d826be87Cd0A4b90855C2F38f7FcfE4eaA7);

    constructor() {}

    function getMainUSDPoolTokens() external view returns (address[] memory) {
        return MainUSDPool.getTokenAddresses();
    }

    function getFRAXPoolTokens() external view returns (address[] memory) {
        return FraxPool.getTokenAddresses();
    }

    function getMIMPoolTokens() external view returns (address[] memory) {
        return MimPool.getTokenAddresses();
    }

    function getsAVAXPoolTokens() external view returns (address[] memory) {
        return sAvaxPool.getTokenAddresses();
    }

    // function getPriceInUSD(address asset) external view returns (uint256) {
    //     return prices.getAssetPriceReciprocal(asset);
    // }

    function potentialSwapinMainUSD(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external view returns (uint256 swapPotential, uint256 fee) {
        (swapPotential, fee) = MainUSDPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        return (swapPotential, fee);
    }

    function potentialSwapinFraxPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external view returns (uint256 swapPotential, uint256 fee) {
        (swapPotential, fee) = FraxPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        return (swapPotential, fee);
    }

    function potentialSwapinMIMPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external view returns (uint256 swapPotential, uint256 fee) {
        (swapPotential, fee) = MimPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        return (swapPotential, fee);
    }

    function potentialSwapinStakeAvaxPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external view returns (uint256 swapPotential, uint256 fee) {
        (swapPotential, fee) = sAvaxPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        return (swapPotential, fee);
    }

    // https://docs.platypus.finance/platypus-finance-docs/concepts/coverage-ratio
    // retention ratio
    // * @notice Gets current retention ratio parameter
    // * @return The current retention ratio parameter in Pool

    // swap
    function SwapinMainUSDPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external {
        IERC20(asset1).approve(0x66357dCaCe80431aee0A7507e2E361B7e2402370, amountInAsset1);  
        (uint256 swapPotential, uint256 fee) = MainUSDPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        console.log("PotentialSwap:", swapPotential);
        console.log("Potential Fee:", fee);
        (uint256 amountRecieved, uint256 trueHaircut) = MainUSDPool.swap(
            asset1,
            asset2,
            amountInAsset1,
            swapPotential,
            address(this),
            block.timestamp
        );
        console.log("Swap Result:", amountRecieved);
        console.log("True Fee:", trueHaircut);

    }

    function SwapinFRAXUSDPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external {
        IERC20(asset1).approve(0xB8E567fc23c39C94a1f6359509D7b43D1Fbed824, amountInAsset1);  
        (uint256 swapPotential, uint256 fee) = FraxPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        console.log("PotentialSwap:", swapPotential);
        console.log("Potential Fee:", fee);
        (uint256 amountRecieved, uint256 trueHaircut) = FraxPool.swap(
            asset1,
            asset2,
            amountInAsset1,
            swapPotential,
            address(this),
            block.timestamp
        );
        console.log("Swap Result:", amountRecieved);
        console.log("True Fee:", trueHaircut);

    }

    function SwapinMIMUSDPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external {
        IERC20(asset1).approve(0x30C30d826be87Cd0A4b90855C2F38f7FcfE4eaA7, amountInAsset1);  
        (uint256 swapPotential, uint256 fee) = MimPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        console.log("PotentialSwap:", swapPotential);
        console.log("Potential Fee:", fee);
        (uint256 amountRecieved, uint256 trueHaircut) = MimPool.swap(
            asset1,
            asset2,
            amountInAsset1,
            swapPotential,
            address(this),
            block.timestamp
        );
        console.log("Swap Result:", amountRecieved);
        console.log("True Fee:", trueHaircut);

    }

    function SwapinStakedAVAXPool(
        address asset1,
        address asset2,
        uint256 amountInAsset1
    ) external {
        IERC20(asset1).approve(0x4658EA7e9960D6158a261104aAA160cC953bb6ba, amountInAsset1);  
        (uint256 swapPotential, uint256 fee) = sAvaxPool.quotePotentialSwap(
            asset1,
            asset2,
            amountInAsset1
        );

        console.log("PotentialSwap:", swapPotential);
        console.log("Potential Fee:", fee);
        (uint256 amountRecieved, uint256 trueHaircut) = sAvaxPool.swap(
            asset1,
            asset2,
            amountInAsset1,
            swapPotential,
            address(this),
            block.timestamp
        );
        console.log("Swap Result:", amountRecieved);
        console.log("True Fee:", trueHaircut);

    }

    function getPlatypusPrice(address token) external view returns (uint256) {
        address priceAddress = MainUSDPool.getPriceOracle();
        ChainlinkProxyPriceProvider price = ChainlinkProxyPriceProvider(priceAddress);
        uint256 asset_price = price.getAssetPrice(token);
        return asset_price;
    }
}
