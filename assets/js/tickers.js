(async () => {
  const contract = "0xddf5d280948c0c9529ffa93471ae5fb924084444".toLowerCase();
  const tokenUrl = `https://api.coingecko.com/api/v3/coins/binance-smart-chain/contract/${contract}`;
  const bnbUrl = 'https://api.coingecko.com/api/v3/coins/binancecoin';
  const elUsd = document.getElementById('price-usd');
  const elUsdChange = document.getElementById('change-usd');
  const elBnb = document.getElementById('price-bnb');
  async function update() {
    try {
      const [r1, r2] = await Promise.all([fetch(tokenUrl), fetch(bnbUrl)]);
      if (!r1.ok) throw new Error('cg token');
      const token = await r1.json();
      const bnb = r2.ok ? await r2.json() : null;
      const price = token?.market_data?.current_price?.usd ?? null;
      const change = token?.market_data?.price_change_percentage_24h ?? null;
      const bnbUsd = bnb?.market_data?.current_price?.usd ?? null;
      elUsd.textContent = price ? '$' + Number(price).toLocaleString(undefined,{minimumFractionDigits:6,maximumFractionDigits:8}) : '—';
      if (change !== null) {
        elUsdChange.textContent = (change>=0?'+':'') + change.toFixed(2) + '%';
        elUsdChange.style.color = change>=0? '#21d07a':'#ff6b6b';
      }
      elBnb.textContent = (price && bnbUsd) ? (Number(price)/Number(bnbUsd)).toFixed(9) + ' BNB' : '—';
    } catch(e) {
      console.error(e);
      if(elUsd) elUsd.textContent='—'; if(elBnb) elBnb.textContent='—'; if(elUsdChange) elUsdChange.textContent='';
    }
  }
  update();
  setInterval(update,15000);
})();