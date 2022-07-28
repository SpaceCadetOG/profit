const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { ethers, network } = require("hardhat");
const addresses = require("../utils/addresses");
const ME = "0xE5e96c7AA9De0451DBE29ACDBFD7632F0963f121";
describe("Using GMX", function() {
  async function deployFixture() {
    let gmx;

    const GMX = await ethers.getContractFactory("usingGMX");
    gmx = await GMX.deploy();
    await gmx.deployed();

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


    const wavaxTokenAbi = [
      "function balanceOf(address) external view returns (uint256)",
      "function deposit() public payable",
      "function approve(address,uint) public returns (bool)"
  ]

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

    const wavax = await ethers.getContractAt(
      wavaxTokenAbi,
      addresses.mainnet.tokens.avax.wavax,
      user
    );

    console.log(`GMX Controller Contract: ${gmx.address}`);


    return { user, gmx, usdc, wavax};

  }

  describe("Get stuff from gmx", () => {
    it('should get price feed of gmx', async function ()
    {
      const {gmx} = await loadFixture(deployFixture)
      const pricefeed = await gmx.getPriceFeedGMX()
      console.log(`GMX Prices Feed: ${pricefeed}`)
    })

    it('should get price of wavax and eth gmx', async function ()
    {
      const {gmx} = await loadFixture(deployFixture)
      const avax_price = ethers.utils.formatUnits(await gmx.getPriceOnGMX(addresses.mainnet.tokens.avax.wavax), 30)
      console.log(`GMX Prices of AVAX: ${avax_price}`)
      const eth_price = ethers.utils.formatUnits(await gmx.getPriceOnGMX(addresses.mainnet.tokens.avax.weth_e), 30)
      console.log(`GMX Prices of ETH: ${eth_price}`)
    })
    
    it('Token Amount To USD On GMX', async function ()
    {
      const { gmx, usdc } = await loadFixture(deployFixture)
      amountIn = 1n * 10n ** 6n;
      amountInUSDC = 1n * 10n ** 18n;
      const avax_price = ethers.utils.formatUnits(await gmx.TokenAmountToUSDMinOnGMX(addresses.mainnet.tokens.avax.wavax, amountIn), 18)
      const eth_price = ethers.utils.formatUnits(await gmx.TokenAmountToUSDMinOnGMX(addresses.mainnet.tokens.avax.weth_e, amountIn), 18)
      console.log(`1 AVAX to USD: $${avax_price}`)
      console.log(`1 ETH to USD: $${eth_price}`)

    })

    it('MAX AMOUNT OUT for USDC USD On GMX', async function ()
    {
      const { gmx, usdc } = await loadFixture(deployFixture)
      amountIn = 1n * 10n ** 18n;
      amountInUSDC = 100n * 10n ** 6n;
      const avax_price = await gmx.getAmountsOutOnGMX(addresses.mainnet.tokens.avax.wavax, addresses.mainnet.tokens.avax.usdc, amountIn)
      const eth_price = await gmx.getAmountsOutOnGMX(addresses.mainnet.tokens.avax.weth_e, addresses.mainnet.tokens.avax.usdc, amountIn)
      console.log(`1 AVAX to USD: $${avax_price[0]} || ${avax_price[1]}`)
      console.log(`1 ETH to USD: $${eth_price[0]} || ${eth_price[1]}`)

    })

    it('Swap USDC for WAVAX On GMX', async function ()
    {
      const { gmx, usdc, wavax, user } = await loadFixture(deployFixture)
      amountIn = 5n * 10n ** 6n;
      // amountInUSDC = 100n * 10n ** 6n;

      console.log(
        "B: USDC Balance of User",
        ethers.utils.formatUnits(await usdc.balanceOf(user.address), 6)
      );

      console.log(
        "B: USDC Balance of contract",
        ethers.utils.formatUnits(await usdc.balanceOf(gmx.address), 6)
      );

      console.log(
        "B: WAVAX Balance of User",
        ethers.utils.formatUnits(await usdc.balanceOf(user.address), 18)
      );

      console.log(
        "B: WAVAX Balance of contract",
        ethers.utils.formatUnits(await wavax.balanceOf(gmx.address), 18)
      );
      await usdc.connect(user).transfer(gmx.address, amountIn);
      await gmx.swaptOnGMX(usdc.address, wavax.address, amountIn)
      console.log(`Swapped USDC -> WAVAX}`)

      console.log(
        "B: USDC Balance of User",
        ethers.utils.formatUnits(await usdc.balanceOf(user.address), 6)
      );

      console.log(
        "B: USDC Balance of contract",
        ethers.utils.formatUnits(await usdc.balanceOf(gmx.address), 6)
      );

      console.log(
        "B: WAVAX Balance of User",
        ethers.utils.formatUnits(await usdc.balanceOf(user.address), 18)
      );

      console.log(
        "B: WAVAX Balance of contract",
        ethers.utils.formatUnits(await wavax.balanceOf(gmx.address), 18)
      );
    })

    it('get Pool Amount to take Postion GMX', async function ()
    {
      const { gmx, usdc } = await loadFixture(deployFixture)
      amountIn = 1n * 10n ** 18n;
      amountInUSDC = 100n * 10n ** 6n;
      const avax_price = await gmx.getTokensAvailableInGMXPool(addresses.mainnet.tokens.avax.wavax)
      const eth_price = await gmx.getTokensAvailableInGMXPool(addresses.mainnet.tokens.avax.weth_e)
      console.log(`1 AVAX Pool Size: ${ethers.utils.formatEther(avax_price)} avax`)
      console.log(`1 ETH Pool Size: ${ethers.utils.formatEther(eth_price)} eth`)

    })

    it.only('Open Postion on GMX', async function ()
    {
      const { gmx, usdc } = await loadFixture(deployFixture)


    })
  });

});
