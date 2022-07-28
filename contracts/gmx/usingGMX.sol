// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.6.12;

import "gmx-contracts/contracts/core/Vault.sol";
import "gmx-contracts/contracts/core/interfaces/IVaultPriceFeed.sol";
import "gmx-contracts/contracts/core/interfaces/IVaultUtils.sol";
import "gmx-contracts/contracts/core/interfaces/IRouter.sol";
import "gmx-contracts/contracts/peripherals/Reader.sol";
import "../lib/UTILS.sol";

contract usingGMX {
    Vault private vault = Vault(0x9ab2De34A33fB459b538c43f251eB825645e8595);
    IRouter private router =
        IRouter(0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8);
    Reader private reader = Reader(0x67b789D48c926006F5132BFCe4e976F0A7A63d5D);
    address private constant WAVAX = 0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7;

    // Get Prices
    function getPriceFeedGMX() public view returns (address) {
        return vault.priceFeed();
    }

    function getPriceOnGMX(address asset) external view returns (uint256) {
        address priceFeedAddress = getPriceFeedGMX();
        IVaultPriceFeed vaultPrices = IVaultPriceFeed(priceFeedAddress);
        return vaultPrices.getPrice(asset, false, false, false);
    }

    function TokenAmountToUSDMinOnGMX(address _tokenIn, uint256 _amount)
        external
        view
        returns (uint256 amountOut)
    {
        amountOut = vault.tokenToUsdMin(_tokenIn, _amount);
        return amountOut;
    }

    // swap => basic uniswap

    // get amounts out and get amount in

    function getAmountsInOnGMX(address _tokenIn, address _tokenOut)
        external
        view
        returns (uint256)
    {
        return reader.getMaxAmountIn(vault, _tokenIn, _tokenOut);
    }

    function getAmountsOutOnGMX(
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) public view returns (uint256, uint256) {
        return reader.getAmountOut(vault, _tokenIn, _tokenOut, _amount);
    }

    function swaptOnGMX(
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) external {
        IERC20(_tokenIn).approve(
            0x5F719c2F1095F7B9fc68a68e35B51194f4b6abe8,
            _amount
        );

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
        (uint256 _amountOutMin, uint256 fee) = getAmountsOutOnGMX(
            path[0],
            path[1],
            _amount
        );
        router.swap(path, _amount, _amountOutMin, address(this));
    }

    // will edit this after finishing Positions
    function getTokensAvailableInGMXPool(address asset)
        external
        view
        returns (uint256 amountAvailable)
    {
        //- *For shorts, the query would depend on the stablecoin token used to open the position.*
        uint256 poolAmount = vault.poolAmounts(asset);

        uint256 reservedAmount = vault.reservedAmounts(asset);

        amountAvailable = poolAmount - reservedAmount;
        return amountAvailable;
    }

    function GetUserPositionsOnGMXPool(address asset) external {
        // https://gmxio.gitbook.io/gmx/contracts#positions-list
    }

    function OpenLeveragePositionOnGMXPool(address asset) external {
        /**
    // open position => Flash Loan to long or short asset pay back earned funds
    // * Long  => earn profit if tokwn price goes up
    // * Short => earn profit if tokwn price goes down
    // * track for manage => entryPrice, exitPrice, liquidationPrice *
    trading fee = 0.1% of position size
    closing fee = 0.1% of position size
    borrow fee = paid to counter-party of our trade every hour([(asset borrowed)/(total assets in pools) * 0.01%])
        // call manage position()
     */
        //////////////////////////////////////
    }

    function ManageLeveragePositionOnGMXPool(address asset) external {
        // PositonManger
        // Increase
        // Decrease
        // start here => https://gmxio.gitbook.io/gmx/trading#managing-positions
        // manage position
        // * Will manage and watch price of asset and stop_loss()
        // deposit or withdraw more
        /**
        -> will take a snapshot of entryPrice
        -> Leverage for a position is displayed = (position size) / (position collateral) or (position size + PnL) / (position collateral),
         */
        // * Will Compare to the
        //////////////////////////////////////
        // stop - loss
        // -> triggers set off based on a set price...also need to be shut down manually
        /**
    Take Profit
    Note that orders are not guaranteed to execute, this can occur in a few situations including but not exclusive to:
    - The mark price which is an aggregate of exchange prices did not reach the specified price
    - The specified price was reached but not long enough for it to be executed
    - No keeper picked up the order for execution 
    - Additionally, trigger orders are market orders and are not guaranteed to execute at the trigger price.
     */
    }

    function CloseLeveragePositionOnGMXPool(address asset) external {
        // close position =>  pay back w/ asset long/shorted earned funds
        //      short is paid out in => usdc or usdt
        //////////////////////////////////////
    }

    //////////////////////////////////////
    // Liqudations => (collateral - losses - borrow fee) is less than 1% of position
    //////////////////////////////////////
    // Pricing => No price impact for trades...execute trades at mark price [price api for chainlink => https://api.gmx.io/prices]
    // Stats per assets => [https://gmxio.gitbook.io/gmx/api]
    // Execution Fee => for all transactions
}
