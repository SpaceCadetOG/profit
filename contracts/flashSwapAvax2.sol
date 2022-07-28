
pragma solidity 0.8.4;
import "hardhat/console.sol";
import "./interfaces/IExchange.sol";
import "@traderjoe-xyz/core/contracts/traderjoe/interfaces/IJoeCallee.sol";
import "@pangolindex/exchange-contracts/contracts/pangolin-core/interfaces/IPangolinCallee.sol";
import "./swapAVAX.sol";
import "./lib/UTILSv2.sol";
contract FlashSwapAvax2 is IPangolinCallee, IJoeCallee {
    address private JOE_FACTORY = 0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10;
    address private PNG_FACTORY = 0xefa94DE7a4656D787667C749f7E1223D71E9FD88;
    address private constant WAVAX = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;
    SwapperV2_2 private swapper;

    function FlashSwapPNG(address _tokenBorrow, uint256 _amount) external {
        address pair = IFactory(PNG_FACTORY).getPair(_tokenBorrow, WAVAX);
        require(pair != address(0), "!pair");

        address token0 = IPair(pair).token0();
        address token1 = IPair(pair).token1();
        uint256 amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint256 amount1Out = _tokenBorrow == token1 ? _amount : 0;

        // need to pass some data to trigger uniswapV2Call
        bytes memory data = abi.encode(_tokenBorrow, _amount);

        IPair(pair).swap(amount0Out, amount1Out, msg.sender, data);
    }

    function FlashSwapJOE(address _tokenBorrow, uint256 _amount) external {
        address pair = IFactory(JOE_FACTORY).getPair(_tokenBorrow, WAVAX);
        require(pair != address(0), "!pair");

        address token0 = IPair(pair).token0();
        address token1 = IPair(pair).token1();
        uint256 amount0Out = _tokenBorrow == token0 ? _amount : 0;
        uint256 amount1Out = _tokenBorrow == token1 ? _amount : 0;

        // need to pass some data to trigger uniswapV2Call
        bytes memory data = abi.encode(_tokenBorrow, _amount);

        IPair(pair).swap(amount0Out, amount1Out, address(this), data);
    }

    // 1) update more robust => https://github.com/Uniswap/v2-periphery/blob/master/contracts/examples/ExampleFlashSwap.sol

    // add conditions
    //     if (exchange == JOE) {
    //         joeCall(_sender, _amount1, _amount0, _data);
    //     } else {
    //         pangolinCall(_sender, _amount1, _amount0, _data);
    //     }

    function joeCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external override {
        address token0 = IPair(msg.sender).token0();
        address token1 = IPair(msg.sender).token1();
        address pair = IFactory(JOE_FACTORY).getPair(token0, token1);
        require(msg.sender == pair, "!pair");
        require(_sender == address(this), "!sender");

        (address tokenBorrow, uint256 amount) = abi.decode(
            _data,
            (address, uint256)
        );

        // about 0.3%
        uint256 fee = ((amount * 3) / 997) + 1;
        uint256 amountToRepay = amount + fee;


         // swap frax on png for avax
        swapper.swap(0xD24C2Ad096400B6FBcd2ad8B24E7acBc21A1da64, tokenBorrow, WAVAX, amount, msg.sender);

  
        // swap frax on joe for avax
        swapper.swap(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D,  WAVAX, tokenBorrow, IERC20(tokenBorrow).balanceOf(address(this)), msg.sender);



        // do stuff here
        console.log("traderjoe flash swap");
        console.log("flash amount:", amount);
        console.log("amount0;", _amount0);
        console.log("amount1:", _amount1);
        console.log("swap fee:", fee);
        console.log("amount to repay", amountToRepay);

        IERC20(tokenBorrow).approve(pair, amountToRepay);
    }

    function pangolinCall(
        address _sender,
        uint256 _amount0,
        uint256 _amount1,
        bytes calldata _data
    ) external override {
        address token0 = IPair(msg.sender).token0();
        address token1 = IPair(msg.sender).token1();
        address pair = IFactory(PNG_FACTORY).getPair(token0, token1);
        require(msg.sender == pair, "!pair");
        require(_sender == address(this), "!sender");

        (address tokenBorrow, uint256 amount) = abi.decode(
            _data,
            (address, uint256)
        );

         // swap frax on joe for avax
        swapper.swap(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D, tokenBorrow, WAVAX, amount, msg.sender);

        

        // about 0.3%
        uint256 fee = ((amount * 3) / 997) + 1;
        uint256 amountToRepay = amount + fee;

        // do stuff here
        console.log("pangolin flash swap");
        console.log("flash amount:", amount);
        console.log("amount0;", _amount0);
        console.log("amount1:", _amount1);
        console.log("swap fee:", fee);
        console.log("amount to repay", amountToRepay);

        IERC20(tokenBorrow).transfer(pair, amountToRepay);
    }
}
