const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, network } = require("hardhat");
const { expect } = require("chai");
const addresses = require("../utils/addresses");
describe("Getting Prices from Platytus Contracts", function() {
  async function deployFixture() {
    let pngPrices;

    const PNGPrices = await ethers.getContractFactory("usingPlatypus");
    pngPrices = await PNGPrices.deploy();
    await pngPrices.deployed();

    return { pngPrices };
  }

  describe("Get Token List in Platytus Pools", () => {
    it("MainUSDPool)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const MainPoolAddress = await pngPrices.getMainUSDPoolTokens();

      console.log(`Main USD Token List`);
      console.log(`+++++++++++++++++++`);
      console.log(`USDT.e: ${MainPoolAddress[0]}`);
      console.log(`USDC.e: ${MainPoolAddress[1]}`);
      console.log(`DAI.e: ${MainPoolAddress[2]}`);
      console.log(`USDC: ${MainPoolAddress[3]}`);
      console.log(`USDt: ${MainPoolAddress[4]}`);
    });

    it("FraxPool)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const FRAXPool = await pngPrices.getFRAXPoolTokens();

      console.log(`Frax Token List`);
      console.log(`+++++++++++++++++++`);
      console.log(`FRAX: ${FRAXPool[0]}`);
      console.log(`USDC: ${FRAXPool[1]}`);
    });
    it("MIMPool)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const MainPoolAddress = await pngPrices.getMIMPoolTokens();

      console.log(`MIM token List`);
      console.log(`+++++++++++++++++++`);
      console.log(`MIM: ${MainPoolAddress[0]}`);
      console.log(`USDC: ${MainPoolAddress[1]}`);
    });
    it("sAVAXPool)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const MainPoolAddress = await pngPrices.getsAVAXPoolTokens();

      console.log(`sAvax token List`);
      console.log(`+++++++++++++++++++`);
      console.log(`WAVAX: ${MainPoolAddress[0]}`);
      console.log(`sAVAX: ${MainPoolAddress[1]}`);
    });
  });

  describe("Get potentialSwap() in Platytus Pools", () => {
    it("potentialSwap(usdt.e -> usdt)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const PairAddress = await pngPrices.potentialSwapinMainUSD(
        addresses.mainnet.tokens.avax.usdt_e,
        addresses.mainnet.tokens.avax.usdt,
        200n * 10n ** 6n
      );

      daiBack = ethers.utils.formatUnits(PairAddress[0], 6);
      cut = ethers.utils.formatUnits(PairAddress[1], 6);
      console.log(`USDT amount back: $${daiBack}`);
      console.log(`haircut: ${cut}`);
    });

    it("potentialSwap(usdt -> usdc.e)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const PairAddress = await pngPrices.potentialSwapinMainUSD(
        addresses.mainnet.tokens.avax.usdt,
        addresses.mainnet.tokens.avax.usdc_e,
        200n * 10n ** 6n
      );

      daiBack = ethers.utils.formatUnits(PairAddress[0], 6);
      cut = ethers.utils.formatUnits(PairAddress[1], 6);
      console.log(`USDC.e amount back: $${daiBack}`);
      console.log(`haircut: ${cut}`);
    });

    it("potentialSwap(frax -> usdc)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const PairAddress = await pngPrices.potentialSwapinFraxPool(
        addresses.mainnet.tokens.avax.usdc,
        addresses.mainnet.tokens.avax.frax,
        200n * 10n ** 6n
      );

      daiBack = ethers.utils.formatUnits(PairAddress[0], 18);
      cut = ethers.utils.formatUnits(PairAddress[1], 18);
      console.log(`Frax amount back: $${daiBack}`);
      console.log(`haircut: ${cut}`);
    });

    it("potentialSwap(mim -> usdc) in pool", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const PairAddress = await pngPrices.potentialSwapinMIMPool(
        addresses.mainnet.tokens.avax.usdc,
        addresses.mainnet.tokens.avax.mim,
        200n * 10n ** 6n
      );
      cut = ethers.utils.formatUnits(PairAddress[1], 18);
      daiBack = ethers.utils.formatUnits(PairAddress[0], 18);
      console.log(`MIM amount back: $${daiBack}`);
      console.log(`haircut: ${cut}`);
    });

    it("potentialSwap(avax -> sAvax)", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const PairAddress = await pngPrices.potentialSwapinStakeAvaxPool(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.sAvax,
        1n * 10n ** 18n
      );
      cut = ethers.utils.formatUnits(PairAddress[1], 18);
      daiBack = ethers.utils.formatUnits(PairAddress[0], 18);
      console.log(`sAvax amount back: ${daiBack}`);
      console.log(`haircut: ${cut}`);
    });

    it.only("getPlatypusPrice", async () => {
      const { pngPrices } = await loadFixture(deployFixture);
      const Address = Number(await pngPrices.getPlatypusPrice(addresses.mainnet.tokens.avax.usdc), 8);
      console.log(`WAVAX: ${ethers.utils.formatUnits(Address, 8)}`);
    
    });
  });



});
