/*
 * [] listen to each block on the Avalanche C-chain and read the prices of a given pair that is present on both DEXes (e.g AVAX/USDT).
 * [] When the prices are off by a significant margin, do the following in a single transaction:
 * [] Borrow AVAX from the lower priced pair using flash swaps
 * [] Sell AVAX on the higher priced pair for USDT
 * [] Pay back USDT on the lower priced pair
 * [] Collect profit
 */
const { ethers, network } = require("hardhat")

// setup configurations => Network{eth, avax, arbitrum}, Users{signers, balance}
let owner 

async function main()
{
    await loadingAcct()
    await lookForPlays()
}

async function lookForPlays() {
    console.log('looking to score')

    // 1) target route
    // if target_route = useProfitableTrade() -> make trade
    // else target_route = searchForTradeRoute() -> make trade

    // 2) Call contract to estimateTrde
    
}


async function loadingAcct() {
    console.log('looking for you...')
        
    [owner] = await ethers.getSigners()
    console.log(`Found yoo ${owner.address}`)
}

async function useProfitableTrade() {
    console.log('looks good to trade...')
    // will select thw targetRoute best for profit
        
}

async function searchForTradeRoute() {
    console.log('searching for good trades...')

    // gets router 1 prices
    // gets router 2 prices
    // gets token 1 prices
    // gets token 2 prices
        

}
main()