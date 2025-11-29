document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------
    // Crypto Terminal Logic
    // -----------------------------------
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
        const logs = [
            { text: "> Initialisation du protocole Franc Congolais (FC)...", color: "text-slate-300" },
            { text: "> Chargement des modules de sécurité...", color: "text-blue-400" },
            { text: "> Connexion au Binance Smart Chain (Mainnet)...", color: "text-yellow-400" },
            { text: "[SUCCESS] Nœud BSC connecté (Ping: 24ms)", color: "text-green-400" },
            { text: "> Vérification du contrat Proxy 0xddf...444", color: "text-slate-300" },
            { text: "[INFO] Architecture: OpenZeppelin Upgradeable", color: "text-blue-300" },
            { text: "[INFO] Admin: Sécurisé (Multi-sig compatible)", color: "text-blue-300" },
            { text: "> Scan des vulnérabilités (Reentrancy, Overflow)...", color: "text-yellow-400" },
            { text: "[SECURE] Aucune faille critique détectée.", color: "text-green-400" },
            { text: "> Synchronisation de la Tokenomics...", color: "text-slate-300" },
            { text: ">> Supply Totale: 1,000,000,000 FC", color: "text-purple-400" },
            { text: ">> Taxe Dynamique: Active (2-5%)", color: "text-purple-400" },
            { text: "> Système prêt. En attente d'instructions...", color: "text-white font-bold" },
        ];

        let currentIndex = 0;
        let animationInterval;

        function addLine() {
            if (currentIndex < logs.length) {
                const line = logs[currentIndex];
                const div = document.createElement('div');
                div.className = `${line.color} break-words font-mono text-sm mb-1 leading-tight`;
                div.innerHTML = `<span class="opacity-50 mr-2 text-xs">${new Date().toLocaleTimeString('fr-FR', { hour12: false })}:</span>${line.text}`;
                terminalBody.appendChild(div);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                currentIndex++;
            } else {
                 if (!document.getElementById('terminal-cursor')) {
                     const cursorDiv = document.createElement('div');
                     cursorDiv.id = 'terminal-cursor';
                     cursorDiv.className = "flex items-center gap-2 text-green-500 animate-pulse mt-2 font-mono text-sm";
                     cursorDiv.innerHTML = `<span>root@franc-congolais:~$</span><span class="w-2 h-4 bg-green-500 block"></span>`;
                     terminalBody.appendChild(cursorDiv);
                     terminalBody.scrollTop = terminalBody.scrollHeight;
                 }
                 clearInterval(animationInterval);
            }
        }

        animationInterval = setInterval(addLine, 600);
    }

    // -----------------------------------
    // Contract Details Interaction
    // -----------------------------------
    const btnCopy = document.getElementById('btn-copy-address');
    const btnQr = document.getElementById('btn-toggle-qr');
    const qrContainer = document.getElementById('qr-container');
    const tokenAddress = "0xddf5d280948c0c9529ffa93471ae5fb924084444";

    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(tokenAddress).then(() => {
                const originalIcon = btnCopy.innerHTML;
                btnCopy.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-green-500"></i>`;
                if(window.lucide) window.lucide.createIcons();
                
                setTimeout(() => {
                    btnCopy.innerHTML = originalIcon;
                    if(window.lucide) window.lucide.createIcons();
                }, 2000);
            });
        });
    }

    if (btnQr && qrContainer) {
        btnQr.addEventListener('click', () => {
            const isHidden = qrContainer.classList.contains('hidden');
            if (isHidden) {
                qrContainer.classList.remove('hidden');
                qrContainer.classList.add('flex');
                btnQr.classList.add('bg-blue-600', 'text-white');
                btnQr.classList.remove('hover:bg-slate-800', 'text-slate-400');
            } else {
                qrContainer.classList.add('hidden');
                qrContainer.classList.remove('flex');
                btnQr.classList.remove('bg-blue-600', 'text-white');
                btnQr.classList.add('hover:bg-slate-800', 'text-slate-400');
            }
        });
    }
});