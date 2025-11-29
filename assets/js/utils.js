// utils.js
function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Copié !");
    });
}
