export const POOL_SUI_USDT = "0xdc117aec53ba851e1fca972c95bc1c2f794bfadb";
import { SDK } from './sdk/sdk';
import { TESTNET_CONFIG } from './config/configuration';
//import { CreateSwapTXPayloadParams } from './modules';
const SUI_COIN_TYPE = "0x2::sui::SUI";
const USDT_COIN_TYPE = "0x6674cb08a6ef2a155b3c341a8697572898f0e4d1::usdt::USDT";

(async function main() {
    const address = '0x09761aebdb103269c42265cc0aa646620234e7c8';

    const sdk = new SDK(TESTNET_CONFIG);

    const poolDetail = await sdk.Pool.getPoolInfo(SUI_COIN_TYPE,USDT_COIN_TYPE);

    console.log(poolDetail);
    const liquidFrom = await sdk.Pool.calculateRate('from',SUI_COIN_TYPE,USDT_COIN_TYPE,1)
    const liquidTo = await sdk.Pool.calculateRate('to',SUI_COIN_TYPE,USDT_COIN_TYPE,1)
    console.log(`liquidFrom: ${liquidFrom} liquidTo: ${liquidTo}`)

    const token = await sdk.Coin.getTokenBalance(address,SUI_COIN_TYPE);
    const amounOut = await sdk.Swap.calculateRate('from',SUI_COIN_TYPE,USDT_COIN_TYPE,2)
    const amounIn = await sdk.Swap.calculateRate('to',SUI_COIN_TYPE,USDT_COIN_TYPE,2000)
    console.log(`amountOut: ${amounOut} amountIn: ${amounIn}` )
    const balance = token.balance;
    console.log(`balance: ${balance}`)
    const tokenList = sdk.CoinList.getCoinInfoList();
    console.log(tokenList);

    const tokenInfo = sdk.CoinList.getCoinInfoBySymbol('SUI');
    console.log(tokenInfo);
})();