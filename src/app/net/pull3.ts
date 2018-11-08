import { shapeshiftApiPublicKey } from '../utils/constants';
import { xorDecode } from '../utils/tools';
import { getThirdFromServer } from './pull';

// ==========================三方接口=======================================
// http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4 测试
// http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=37223&sign=7987216e841c32aa08d0ea0dcbf65eed
// https://api.huobipro.com/market/history/kline?symbol=btcusdt&period=1day&size=1&AccessKeyId=6fd70042-c5e4c618-d6e619ec-ecfa2
// 获取美元对人民币汇率
export const fetchUSD2CNYRate = () => {
    const url = 'http://api.k780.com/?app=finance.rate&scur=USD&tcur=CNY&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4';
    
    return getThirdFromServer(url).then(res => {
        const str = xorDecode(res.value,res.pk);

        return JSON.parse(str);
    });
};

/**
 * 获取货币对比USDT的比率
 */
export const fetchCurrency2USDTRate = (currencyName:string) => {
    // tslint:disable-next-line:no-reserved-keywords
    const symbol = `${currencyName.toLowerCase()}_usdt`;
    const url = `https://www.okex.com/api/v1/ticker.do?symbol=${symbol}`;
    
    return getThirdFromServer(url).then(res => {
        const str = xorDecode(res.value,res.pk);

        return JSON.parse(str);
    }); 
};

// ======================================================================

/**
 * 获取货币对比USDT的比率
 */
export const shapeshiftMarketinfo = () => {
    const url = `https://shapeshift.io/marketinfo/btc_ltc`;

    return fetch(url).then(res => res.json()).then(json => {
        console.log('shapeshiftMarketinfo------',json);
    });
};

export const shapeshiftShift = () => {
    const url = `https://cors.shapeshift.io/shift`;
    const data = {
        withdrawal:'0x5041F19dC1659E33848cc0f77cbF7447de562917',
        pair:'btc_eth',
        apiKey:shapeshiftApiPublicKey
    };

    // return fetch(url, {
    //     body:data,
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization:'Bearer CZfRLxjor2E49vTfTZDjaeeR78nMMi1rKypV9GRBsmt2'
    //     },
    //     method: 'POST',
    //     mode:'cors'
    // }).then(res => res.json()).then(json => {
    //     console.log('shapeshiftShift------',json);
    // });
};