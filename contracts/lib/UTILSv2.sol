// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract UTILS {
    struct Trade {
        address router;
        address[] trade_assets;
                uint256[] amounts;
        bool tradeExecuted;
    }

    struct GetPrices {
        address router;
        address factory;
        address[] trade_assets;
                uint256[] amounts;
        bool tradeExecuted;
    }

    struct ProvideLiquidity {
        address router;
        address factory;
        uint256[] amounts;
        address[] liquidity_assets;
        bool provided;
    }
}
