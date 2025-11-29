
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const linksContainer = document.getElementById('mobile-links');
    
    // Copy links from desktop to mobile
    const desktopLinks = document.querySelectorAll('#desktop-menu a');
    let linksHtml = '';
    
    desktopLinks.forEach(link => {
        const text = link.textContent.trim();
        const href = link.getAttribute('href');
        
        // Detect if this is the "Buy" button based on text or classes
        if (text.includes('Acheter FC') || link.classList.contains('bg-gradient-to-r')) {
            linksHtml += `
                <div class="pt-4 px-4 pb-2">
                    <a href="${href}" target="_blank" class="block w-full text-center px-5 py-3 bg-blue-600 text-white font-serif font-bold uppercase tracking-wider rounded-sm shadow-lg border border-blue-500/50 hover:bg-blue-500 transition-colors">
                        ${text}
                    </a>
                </div>
            `;
        } else {
            linksHtml += `
                <a href="${href}" class="block px-4 py-3 border-l-2 border-transparent hover:border-blue-500 hover:bg-slate-800/30 text-slate-300 hover:text-white transition-all font-serif">
                    ${text}
                </a>
            `;
        }
    });
    
    linksContainer.innerHTML = linksHtml;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Close on click (only for internal links)
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if(a.getAttribute('href').startsWith('#')) {
                menu.classList.add('hidden');
            }
        });
    });
});
