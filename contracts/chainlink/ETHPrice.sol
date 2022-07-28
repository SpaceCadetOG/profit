// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

// import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ChainlinkPrices {
  AggregatorV3Interface internal eth;
    AggregatorV3Interface internal avax;
        AggregatorV3Interface internal btc;
  

  constructor() {
    // ETH / USD
    eth = AggregatorV3Interface(0x976B3D034E162d8bD72D6b9C989d545b839003b0);
    avax = AggregatorV3Interface(0x0A77230d17318075983913bC2145DB16C7366156);
        btc = AggregatorV3Interface(0x2779D32d5166BAaa2B2b658333bA7e6Ec0C65743);
  }

  function getLatestPriceETH() public view returns (int) {
    (
      uint80 roundID,
      int price,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = eth.latestRoundData();
    // for ETH / USD price is scaled up by 10 ** 8
    return price / 1e8;
  }

    function getLatestPriceAVAX() public view returns (int) {
    (
      uint80 roundID,
      int price,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = avax.latestRoundData();
    // for ETH / USD price is scaled up by 10 ** 8
    return price / 1e8;
  }

    function getLatestPriceBTC() public view returns (int) {
    (
      uint80 roundID,
      int price,
      uint startedAt,
      uint timeStamp,
      uint80 answeredInRound
    ) = btc.latestRoundData();
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