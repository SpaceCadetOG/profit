const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");
const { BigNumber, network, ethers } = require("hardhat");
const addresses = require("../utils/addresses");
const ME = "0xE5e96c7AA9De0451DBE29ACDBFD7632F0963f121";
const avaxTrade = 2;

const JOE = addresses.mainnet.joe.router;
const PNG = addresses.mainnet.png.router;

describe.only("FlashSwapAvax ", function() {
  async function deployFixture() {
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
      addresses.mainnet.tokens.avax.usdt,
      user
    );
    const dai = await ethers.getContractAt(
      TokenAbi,
      addresses.mainnet.tokens.avax.dai_e,
      user
    );

    const SwapOnV2 = await ethers.getContractFactory("FlashSwapAvax2");
    const swapOnV2 = await SwapOnV2.deploy();
    await swapOnV2.deployed();
    console.log(`Swapper Contract: ${swapOnV2.address}`);

    // send user to swap
    amountIn = 1n * 10n ** 18n;

    console.log(
      "B: frax Balance of User",
      ethers.utils.formatUnits(await usdc.balanceOf(user.address), 6)
    );

    // approve contract to swap
    // await usdc.connect(user).transfer(swapOnV2.address, amountIn);
    // let checkAllowance = await usdc.allowance(swapOnV2.address, user.address)
    // console.log(checkAllowance)

    console.log(
      "B: frax Balance of Contract",
      ethers.utils.formatUnits(await usdc.balanceOf(swapOnV2.address), 6)
    );

    console.log(
      "+++++++++++++++++++++++++Approved++++++++++++++++++++++++++++++++++++++++++"
    );

    console.log(
      "+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );

    return { user, swapOnV2, dai, usdc, amountIn };
  }
  describe("Swap frax -> avax", function() {
    it("Should Flashswap on both PNG and JOE", async function() {
      const { user, swapOnV2, dai, usdc, amountIn } = await loadFixture(
        deployFixture
      );
      /*
 * [] When the prices are off by a significant margin:
 * [] signal => Buy AVAX from the lower priced pair exchange
 * [] signal => Sell AVAX on the higher priced pair exchange for USDT 

//  */
      // await swapOnV2.FlashSwapPNG(usdc.address, amountIn);
      await swapOnV2.FlashSwapJOE(usdc.address, amountIn);
    });
  });
});
