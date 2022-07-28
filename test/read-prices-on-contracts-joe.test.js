const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, network } = require("hardhat");
const addresses = require("../utils/addresses");
describe("Getting Prices from JOE Contracts", function() {
  async function deployFixture() {
    let joePrices;

    const JoePrices = await ethers.getContractFactory("JoePrices");
    joePrices = await JoePrices.deploy();
    await joePrices.deployed();

    return { joePrices };
  }

  describe("Get Pair Addresses", () => {
    it("avax/usdc and avax/usdc.: getPairAddress", async () => {
      const { joePrices } = await loadFixture(deployFixture);
      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      );
      console.log(`AVAX/USDC: ${PairAddress}`);

      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc_e
      );
      console.log(`AVAX/USDC.e: ${PairAddress_e}`);
    });

    it("avax/usdt and avax/usdt.e: getPairAddress", async () => {
      const { joePrices } = await loadFixture(deployFixture);
      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      );

      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt_e
      );
      console.log(`AVAX/USDT: ${PairAddress}`);
      console.log(`AVAX/USDT.e: ${PairAddress_e}`);
    });
  });

  describe.only("Get Pair Reserves", () => {
    it("avax/usdc and avax/usdc.e: getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      );
      console.log(`AVAX-USDC: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      );

      avaxReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      usdcReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 6));

      console.log(`AVAX Reserves: ${avaxReserveJoe} wavax`);
      console.log(`USDC Reserve: $${usdcReserveJoe}`);
      const avax_usdc_price = usdcReserveJoe / avaxReserveJoe;
      console.log(`price: $${avax_usdc_price}`);

      console.log("_____________________________________________");
      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc_e
      );
      console.log(`price: $${avax_usdc_price}`);

      console.log(`AVAX-USDC.e: ${PairAddress_e}`);

      const Pair1 = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc_e
      );
      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair1[0], 18));
      usdc_e_ReserveJoe = Number(ethers.utils.formatUnits(Pair1[1], 6));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`USDC.e Reserves: $${usdc_e_ReserveJoe}`);
      const avax_usdc_e_price = usdc_e_ReserveJoe / avax1ReserveJoe;
      console.log(`Pool price: $${avax_usdc_e_price}`);
    });
    it("avax/usdt and avax/usdt.e: getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      );
      console.log(`AVAX-USDT: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      );

      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      usdtReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 6));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`USDT Reserve: $${usdtReserveJoe}`);
      const avax_usdt_price = usdtReserveJoe / avax1ReserveJoe;
      console.log(`price: $${avax_usdt_price}`);

      console.log("_____________________________________________");
      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt_e
      );

      console.log(`AVAX-USDT.e: ${PairAddress_e}`);

      const Pair1 = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt_e
      );
      avaxReserveJoe = Number(ethers.utils.formatUnits(Pair1[0], 18));
      usdt_eReserveJoe = Number(ethers.utils.formatUnits(Pair1[1], 6));

      console.log(`AVAX Reserves: ${avaxReserveJoe} wavax`);
      console.log(`USDT.e Reserves: $${usdt_eReserveJoe}`);
      const avax_usdt_e_price = usdt_eReserveJoe / avaxReserveJoe;
      console.log(`price: $${avax_usdt_e_price}`);
    });
    it("avax/frax getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.frax
      );
      console.log(`AVAX-FRAX: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.frax
      );

      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      fraxReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 18));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`FRAX Reserve: $${fraxReserveJoe}`);
      const avax_frax_price = fraxReserveJoe / avax1ReserveJoe;
      console.log(`price: $${avax_frax_price}`);

      console.log("_____________________________________________");
    });
  });

  describe.only("Get Pair Reserves", () => {
    it("avax/usdc and avax/usdc.e: getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      );
      console.log(`AVAX-USDC: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      );

      avaxReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      usdcReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 6));

      console.log(`AVAX Reserves: ${avaxReserveJoe} wavax`);
      console.log(`USDC Reserve: $${usdcReserveJoe}`);
      const avax_usdc_price = usdcReserveJoe / avaxReserveJoe;
      console.log(`price: $${avax_usdc_price}`);

      console.log("_____________________________________________");
      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc_e
      );
      console.log(`price: $${avax_usdc_price}`);

      console.log(`AVAX-USDC.e: ${PairAddress_e}`);

      const Pair1 = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc_e
      );
      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair1[0], 18));
      usdc_e_ReserveJoe = Number(ethers.utils.formatUnits(Pair1[1], 6));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`USDC.e Reserves: $${usdc_e_ReserveJoe}`);
      const avax_usdc_e_price = usdc_e_ReserveJoe / avax1ReserveJoe;
      console.log(`Pool price: $${avax_usdc_e_price}`);
    });
    it("avax/usdt and avax/usdt.e: getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      );
      console.log(`AVAX-USDT: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      );

      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      usdtReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 6));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`USDT Reserve: $${usdtReserveJoe}`);
      const avax_usdt_price = usdtReserveJoe / avax1ReserveJoe;
      console.log(`price: $${avax_usdt_price}`);

      console.log("_____________________________________________");
      const PairAddress_e = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt_e
      );

      console.log(`AVAX-USDT.e: ${PairAddress_e}`);

      const Pair1 = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt_e
      );
      avaxReserveJoe = Number(ethers.utils.formatUnits(Pair1[0], 18));
      usdt_eReserveJoe = Number(ethers.utils.formatUnits(Pair1[1], 6));

      console.log(`AVAX Reserves: ${avaxReserveJoe} wavax`);
      console.log(`USDT.e Reserves: $${usdt_eReserveJoe}`);
      const avax_usdt_e_price = usdt_eReserveJoe / avaxReserveJoe;
      console.log(`price: $${avax_usdt_e_price}`);
    });
    it("avax/frax getReserves", async () => {
      const { joePrices } = await loadFixture(deployFixture);

      const PairAddress = await joePrices.getPairAddress(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.frax
      );
      console.log(`AVAX-FRAX: ${PairAddress}`);

      const Pair = await joePrices.getReserves(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.frax
      );

      avax1ReserveJoe = Number(ethers.utils.formatUnits(Pair[0], 18));
      fraxReserveJoe = Number(ethers.utils.formatUnits(Pair[1], 18));

      console.log(`AVAX Reserves: ${avax1ReserveJoe} wavax`);
      console.log(`FRAX Reserve: $${fraxReserveJoe}`);
      const avax_frax_price = fraxReserveJoe / avax1ReserveJoe;
      console.log(`price: $${avax_frax_price}`);

      console.log("_____________________________________________");
    });
  });
});
