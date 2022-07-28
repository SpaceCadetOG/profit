Task today
0. 
(a) Read Articles {
    
    1. https://blog.coinbase.com/quantitative-crypto-insight-an-analysis-of-triangular-arbitrage-transactions-in-uniswap-v2-1b572284bfa8 [x]

    2. https://medium.com/coinmonks/flashloan-arbitrage-trades-are-still-profitable-28db937f1a43 [x]

    3. https://thecitadelpub.com/uniswap-flashswaps-make-millions-of-dollars-with-your-code-14d7d5f017dd [x]

    4. https://blog.infura.io/post/build-a-flash-loan-arbitrage-bot-on-infura-part-ii [x]
}
(b) Prep for Deep Work {
        1. https://docs.google.com/document/d/15h9Eu5jHl92qZ_Mcu4Bpy2W4lxQjHUF-D-HSPlEIqhs/edit [x]
}
1. Flashswap TraderJoe <-> PNG [x]

2. Get Prices to compare prices and use as base []
    1. Chainlink prices [x]
    2. *Track Pools price and Pair via contractss* [x]
===================================================================================================================
0. {
    read: {
    1. https://thecitadelpub.com/defi-flashloans-borrow-millions-and-pay-nothing-in-advance-183145e3ac17 []
    2. https://messari.io/article/arbitraging-uniswap-and-sushiswap-in-node-js
    }


1. Platypus {
    - https://docs.platypus.finance/platypus-finance-docs/developers/contracts
        1. get price of asset => 
            - ChainlinkProxyPriceProvider []
        2. get potential swap cost per pool => [x]
        3. swap => [x]
        4. provide liquidity to pools []
            - collateral ratios []
            - deposit []
            - withdraw []
                - from same asset []
                   - quote []
                - from other asset []
                    - quote []
        5. ETH only funcs
    }

2. GMX {
    - https://gmxio.gitbook.io/gmx/contracts
        1. get price of asset => [x]
            [Query Available Amounts] => Will work on math
            - Vault.poolAmounts(_token) can be used to retrieve the amount of tokens in the pool. [x]
            - Vault.reservedAmounts(_token) can be used to retrieve the reserved amount of tokens. [x]
        2. get potential swap cost [x]
        3. swap [x]
        4. Open Position
            - Long
                - increase []
                - decrease []
            - Short
                - increase []
                - decrease []

        5. provide to glp
    }

3. reorganize code
    1. Add price to smart contract from chainlink to compare
    2. Add process for contract to compare prices
    3. Add process for perform conditional swap []
        - *[ if(Traderjoe) || (Chainlink) >= (PNG) || (Chainlink) = buy on the higher exchange then sell on the lower exchange]* []
    4. create routes for arbitrage [WETH, WBTC, WAVAX, USDC, USDT, DAI, FRAX] -> create simple path to each token
        1. Combo of routes that will look for arb
        2. Simple
            - AVAX/FRAX(PNG) @ $24.408088578354995 => AVAX/FRAX(TJ) @ $24.491640079095607
        3. Trianglar
        - AVAX/USDC(PNG) @ $24.389358265380842 => => AVAX/USDT(TJ) @ $24.427749583696688 => AVAX/FRAX(TJ) @ $24.491640079095607 
        - AVAX/USDC.e(TJ) @ $24.066872223453725 => => AVAX/USDT(PNG) @ $24.147323250983067 => AVAX/FRAX(PNG) @ $24.408088578354995

4. Aave Flashloan
    (a) Simple Aave FlashLoan []
    (b) Simple Aave FlashLoan w/ conditional swap []

================================================================================================================
5. Perform Flashswap w/ GMX and Platypus []
6. Perform Flashloan w/ GMX and Platypus []
}
7. Add Liquidity
    1. Uniswap Forks
    2. Platypus
        - Get Pool Info
    3. GMX
        - Get Pool Info
8. Leverage Yield Farming => Compound and All there Forks
    - Deposit
    - Lend 
    - Leverage
