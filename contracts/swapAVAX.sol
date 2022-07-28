pragma solidity ^0.8.4;
// update with this (Swap to the most exact price) => https://github.com/Uniswap/v2-periphery/blob/master/contracts/examples/ExampleSwapToPrice.sol
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "./lib/UTILSv2.sol";
import "./interfaces/IExchange.sol";

// wavax to erc20
contract SwapperV2_2 {
    // address private constant JOE_V2_ROUTER =
    //     0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant WAVAX = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;


    function swap(
        address router,
        address _tokenIn,
        address _tokenOut,
        uint _amountIn,
        address _to
    ) external {
        // IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(router, _amountIn);

        address[] memory path;
        if (_tokenIn == WAVAX || _tokenOut == WAVAX) {
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
        } else {
            path = new address[](3);
            path[0] = _tokenIn;
            path[1] = WAVAX;
            path[2] = _tokenOut;
        }

        uint256[] memory _amountOutMin = IRouter(router).getAmountsOut(_amountIn, path);

        IRouter(router).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin[0],
            path,
            _to,
            block.timestamp
        );
    }

    function getAmountOutMin(
        address router,
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) public view returns (uint256) {

        address[] memory path;
            path = new address[](2);
            path[0] = _tokenIn;
            path[1] = _tokenOut;
    
        uint256[] memory amountOutMins = IRouter(router).getAmountsOut(
            _amount,
            path
        );
        return amountOutMins[path.length - 1];
    }

    function getAddress() public view returns (address) {
        return address(this);
    }
}
