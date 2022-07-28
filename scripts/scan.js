require("dotenv").config();
const { ethers, network, BigNumber } = require("hardhat");
const provider = ethers.getDefaultProvider(process.env.AVAX);
const wallet = new ethers.Wallet(process.env.PK, provider);
const addresses = require("../utils/addresses");
const abis = require("../utils/abis");
// server
const PORT = "";
// const APP = express()

// ethers wallet config

const eth = "ETH";
const avax = "AVAX";

async function scan() {
  /*
   * [] listen to each block on the Avalanche C-chain and read the prices of a given pair that is present on both DEXes (e.g AVAX/USDT).
   * [] When the prices are off by a significant margin, do the following in a single transaction:
   */

  // exchange config
  const wavaxTokenAbi = [
    "function balanceOf(address) external view returns (uint256)",
    "function deposit() public payable",
    "function approve(address,uint) public returns (bool)",
  ];
  const TokenAbi = [
    "function balanceOf(address account) external view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender)",
  ];
  const wavax = await ethers.getContractAt(
    wavaxTokenAbi,
    addresses.mainnet.tokens.avax.wavax,
    wallet
  );

  const usdc = await ethers.getContractAt(
    TokenAbi,
    addresses.mainnet.tokens.avax.usdc,
    wallet
  );
  const frax = await ethers.getContractAt(
    TokenAbi,
    addresses.mainnet.tokens.avax.frax,
    wallet
  );

  const dai = await ethers.getContractAt(
    TokenAbi,
    addresses.mainnet.tokens.avax.dai_e,
    wallet
  );

  const JoeFACTORY_ABI = abis.joeFactory;
  const JoeROUTER_ABI = abis.joeRouter;
  const JOE_V2_ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const JOE_V2_Factory = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  const JoeFactory = new ethers.Contract(
    JOE_V2_Factory,
    JoeFACTORY_ABI,
    wallet
  );
  const JoeRouter = new ethers.Contract(JOE_V2_ROUTER, JoeROUTER_ABI, wallet);

  const PNG_V2_ROUTER = "0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106";
  const PNG_V2_Factory = "0xefa94DE7a4656D787667C749f7E1223D71E9FD88";
  const PngFACTORY_ABI = abis.pNGFactory;
  const PngROUTER_ABI = abis.pNGRouter;
  const PngPAIR_ABI = abis.pNGPair;

  const PNGFactory = new ethers.Contract(
    PNG_V2_Factory,
    PngFACTORY_ABI,
    wallet
  );
  const PNGRouter = new ethers.Contract(PNG_V2_ROUTER, PngROUTER_ABI, wallet);

  let png_avax_frax;
  let joe_avax_frax;

  async function loadPairs() {
    png_avax_frax = new ethers.Contract(
      await PNGFactory.getPair(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.frax
      ),
      abis.joePair,
      wallet
    );

    png_usdc_avax = new ethers.Contract(
      await PNGFactory.getPair(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdc
      ),
      abis.joePair,
      wallet
    );

    png_dai_avax = new ethers.Contract(
      await PNGFactory.getPair(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.dai_e
      ),
      abis.joePair,
      wallet
    );

    png_usdt_avax = new ethers.Contract(
      await PNGFactory.getPair(
        addresses.mainnet.tokens.avax.wavax,
        addresses.mainnet.tokens.avax.usdt
      ),
      abis.joePair,
      wallet
    );

    // joe_avax_frax = new ethers.Contract(
    //   await JoeFactory.getPair( addresses.mainnet.tokens.avax.wavax, addresses.mainnet.tokens.avax.frax))
  }

  await loadPairs();
  provider.on("block", async (blockNumber) => {
    try {
      console.log(blockNumber);

      // PNG
      const png_reserves = await png_avax_frax.getReserves();
      const reserve0PNG = Number(ethers.utils.formatEther(png_reserves[0]));
      const reserve1PNG = Number(ethers.utils.formatEther(png_reserves[1]));
      const avax_frax_png_price = reserve1PNG / reserve0PNG;

      const png_reserves_usdc_avax = await png_usdc_avax.getReserves();
      const usdc_avax_reserve0PNG = Number(ethers.utils.formatUnits(png_reserves_usdc_avax[0], 6)) ;
      const usdc_avax_reserve1PNG = Number(ethers.utils.formatUnits(png_reserves_usdc_avax[1], 6)) ;
      const usdc_avax_png_price = usdc_avax_reserve1PNG / usdc_avax_reserve0PNG;

      const png_reserves_dai_avax = await png_dai_avax.getReserves();
      const dai_avax_reserve0PNG = Number(ethers.utils.formatEther(png_reserves_dai_avax[0]));
      const dai_avax_reserve1PNG = Number(ethers.utils.formatEther(png_reserves_dai_avax[1]));
      const dai_avax_png_price = dai_avax_reserve1PNG / dai_avax_reserve0PNG;

      const png_reserves_usdt_avax = await png_usdt_avax.getReserves();
      const usdt_avax_reserve0PNG = ethers.utils.formatUnits(png_reserves_usdt_avax[0], 6);
      const usdt_avax_reserve1PNG = ethers.utils.formatUnits(png_reserves_usdt_avax[1], 6);
      const usdt_avax_png_price = usdt_avax_reserve0PNG / usdt_avax_reserve1PNG;

      console.table([
        {
          "PNG PRICE: FRAX/AVAX": avax_frax_png_price,
          "PNG PRICE: USDC/AVAX": usdc_avax_png_price,
          "PNG PRICE: DAI/AVAX": dai_avax_png_price,
          "PNG PRICE: USDT/AVAX": usdt_avax_png_price,
        },
      
      ]);
console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
      // JOE
      console.table([
        {
          "JOE PRICE: FRAX/AVAX": avax_frax_png_price,
          "JOE PRICE: USDC/AVAX": usdc_avax_png_price,
          "JOE PRICE: DAI/AVAX": dai_avax_png_price,
          "JOE PRICE: USDT/AVAX": usdt_avax_png_price,
        },

      
      ]);
    } catch (error)
    {
      console.log(error)
    }
  });
}

async function checkPair(tokenA, tokenB) {
  // exchange Pair

  console.table([
    {
      "Token In": tokenA,
      "Token Out": tokenB,
    },
  ]);
}

async function checkExchange(exchangeA, exchangeB) {
  // exchange Pair

  console.table([
    {
      "Exchange In": exchangeA,
      "Exchange Out": exchangeB,
    },
  ]);
}

scan();
