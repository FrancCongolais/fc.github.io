// tickers.js
const PAIR_ADDRESS = '0xddf5d280948c0c9529ffa93471ae5fb924084444'; 

async function updatePrices() {
    try {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${PAIR_ADDRESS}`);
        const data = await res.json();
        
        if (data.pairs && data.pairs.length > 0) {
            const pair = data.pairs[0];
            const usdtPrice = pair.priceUsd || '---';
            const bnbPrice = pair.priceNative || '---';
            
            const elUsdt = document.getElementById('price-usdt');
            const elBnb = document.getElementById('price-bnb');
            
            if(elUsdt) elUsdt.textContent = `$${parseFloat(usdtPrice).toFixed(10)}`;
            if(elBnb) elBnb.textContent = `${parseFloat(bnbPrice).toFixed(9)} BNB`;
        }
    } catch (e) {
        console.warn('Price fetch failed', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updatePrices();
    setInterval(updatePrices, 30000);
});
