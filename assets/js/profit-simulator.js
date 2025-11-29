document.addEventListener('DOMContentLoaded', () => {
    const investInput = document.getElementById('invest-input');
    const tokenAmountEl = document.getElementById('token-amount');
    const futureValueEl = document.getElementById('future-value');
    const profitEl = document.getElementById('net-profit');
    const multiplierEl = document.getElementById('multiplier');

    const CURRENT_PRICE = 0.0000047163;
    const TARGET_PRICE = 0.1;

    function calculate() {
        let investment = parseFloat(investInput.value);
        if (isNaN(investment) || investment < 0) investment = 0;

        const tokens = investment / CURRENT_PRICE;
        const futureVal = tokens * TARGET_PRICE;
        const profit = futureVal - investment;
        const multiplier = investment > 0 ? futureVal / investment : 0;

        // Update DOM
        if (tokenAmountEl) tokenAmountEl.textContent = Math.floor(tokens).toLocaleString('fr-FR') + ' FC';
        
        // Format Currency USD
        const currencyOptions = { style: 'currency', currency: 'USD' };
        
        // Helper to ensure US format shows as $US or similar if locale varies
        const formatMoney = (val) => val.toLocaleString('fr-FR', currencyOptions).replace('US$', '$US');

        if (futureValueEl) futureValueEl.textContent = formatMoney(futureVal);
        if (profitEl) profitEl.textContent = formatMoney(profit);
        if (multiplierEl) multiplierEl.textContent = 'x' + Math.floor(multiplier).toLocaleString('fr-FR');
    }

    if (investInput) {
        investInput.addEventListener('input', calculate);
        // Run once on load
        calculate();
    }
});