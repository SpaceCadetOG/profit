const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, network } = require("hardhat");
const addresses = require("../utils/addresses");
const ME = "0xE5e96c7AA9De0451DBE29ACDBFD7632F0963f121";
describe("Getting Prices from Platypus Contracts", function() {
  async function deployFixture() {
    let pngPrices;

    const PNGPrices = await ethers.getContractFactory("usingPlatypus");
    pngPrices = await PNGPrices.deploy();
    await pngPrices.deployed();

    let user, amountIn;

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [ME],
    });

    user = await ethers.getSigner(ME);
    // // fork mainnet

    // const wbtc_whale = await ethers.getSigner(tokenWhale.WBTC.avax);
    const TokenAbi = [
      "function balanceOf(address account) external view returns (uint256)",
      // Authenticated Functions
      "function transfer(address to, uint amount) returns (bool)",
      "function approve(address spender, uint256 amount) external returns (bool)",
      "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
      "function allowance(address owner, address spender)",
    ];

    const usdc = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.usdc,
      user
    );
    const dai = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.dai_e,
      user
    );

    const frax = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.frax,
      user
    );

    const mim = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.mim,
      user
    );

    const sAvax = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.sAvax,
      user
    );

    console.log(`Swapper Contract: ${PNGPrices.address}`);

    // send user to swap
    amountIn = 5n * 10n ** 6n;

    console.log(
      "B: USDC Balance of User",
      ethers.utils.formatUnits(await usdc.balanceOf(user.address), 6)
    );

    // approve contract to swap

    // let checkAllowance = await usdc.allowance(swapOnV2.address, user.address)
    // console.log(checkAllowance)

    console.log(
      "B: USDCBalance of Contract",
      ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
    );

    console.log(
      "+++++++++++++++++++++++++Approved++++++++++++++++++++++++++++++++++++++++++"
    );
    await usdc.connect(user).transfer(pngPrices.address, amountIn);

    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );

    return { user, pngPrices, dai, usdc, frax, sAvax, mim, amountIn };

  }

  describe("Get Token List in Platytus Pools", () => {
    it("MainUSDPool", async () => {
      const { user, pngPrices, dai, usdc, amountIn } = await loadFixture(deployFixture);
      console.log(
        "B: DAIBalance of Contract",
        ethers.utils.formatUnits(await dai.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "B: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );

      console.log(`Main USD Swap -> usdc to dai`);
      console.log(`+++++++++++++++++++`);
      await pngPrices.SwapinMainUSDPool(usdc.address, dai.address, amountIn);
      console.log(`+++++++SwapComplete++++++++++++`);

      console.log(
        "A: DAIBalance of Contract",
        ethers.utils.formatUnits(await dai.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "A: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );


    });


    it.only("FRAXUSDPool", async () => {
      const { user, pngPrices, frax, usdc, amountIn } = await loadFixture(deployFixture);
      console.log(
        "B: FRAXBalance of Contract",
        ethers.utils.formatUnits(await frax.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "B: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );

      console.log(`FRAX USD Swap -> usdc to frax`);
      console.log(`+++++++++++++++++++`);
      await pngPrices.SwapinFRAXUSDPool(usdc.address, frax.address, amountIn);
      console.log(`+++++++SwapComplete++++++++++++`);

      console.log(
        "A: FRAXBalance of Contract",
        ethers.utils.formatUnits(await frax.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "A: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );

    });

    it("MIMPool", async () => {
      const { user, pngPrices, mim, usdc, amountIn } = await loadFixture(deployFixture);
      console.log(
        "B: MIMBalance of Contract",
        ethers.utils.formatUnits(await mim.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "B: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );

      console.log(`MIM USD Swap -> usdc to mim`);
      console.log(`+++++++++++++++++++`);
      await pngPrices.SwapinMIMUSDPool(usdc.address, mim.address, amountIn);
      console.log(`+++++++SwapComplete++++++++++++`);

      console.log(
        "A: MIMBalance of Contract",
        ethers.utils.formatUnits(await mim.balanceOf(pngPrices.address), 18)
      );

      console.log(
        "A: USDCBalance of Contract",
        ethers.utils.formatUnits(await usdc.balanceOf(pngPrices.address), 6)
      );

    });





  });

  describe.skip("Get potentialSwap() in Platytus Pools", () => {
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
  });



});
