// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract StablePrices {
    AggregatorV3Interface internal usdc;
    AggregatorV3Interface internal usdt;
    AggregatorV3Interface internal dai;
    AggregatorV3Interface internal mim;
    AggregatorV3Interface internal frax;

    constructor() {
        // ETH / USD
        usdc = AggregatorV3Interface(
            0xF096872672F44d6EBA71458D74fe67F9a77a23B9
        );
        usdt = AggregatorV3Interface(
            0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a
        );
        dai = AggregatorV3Interface(0xF096872672F44d6EBA71458D74fe67F9a77a23B9);
        mim = AggregatorV3Interface(0xEBE676ee90Fe1112671f19b6B7459bC678B67e8a);
        frax = AggregatorV3Interface(
            0xF096872672F44d6EBA71458D74fe67F9a77a23B9
        );
    }

    function getLatestPriceUSDC() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = usdc.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }

    function getLatestPriceUSDT() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = usdt.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }

    function getLatestPriceDAI() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = dai.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }

    function getLatestPriceMIM() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = mim.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }

        function getLatestPriceFRAX() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = frax.latestRoundData();
        // for ETH / USD price is scaled up by 10 ** 8
        return price / 1e8;
    }
}

interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int answer,
            uint startedAt,
            uint updatedAt,
            uint80 answeredInRound
        );
}
