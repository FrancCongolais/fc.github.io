// videos.js
const videos = [
    { title: "Tuto : Acheter FC", thumb: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=500" },
    { title: "Échange PancakeSwap", thumb: "https://images.unsplash.com/photo-1516245834210-c4c14278733f?auto=format&fit=crop&w=500" },
    { title: "Importer Token", thumb: "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=500" }
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('video-gallery');
    if (!container) return;

    videos.forEach(vid => {
        const div = document.createElement('div');
        div.className = "bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-blue-500 transition-all group";
        div.innerHTML = `
            <div class="relative aspect-video bg-black">
                <img src="${vid.thumb}" class="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity">
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-red-600 transition-colors">
                        <i data-lucide="play" class="w-4 h-4 text-white fill-current"></i>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <h4 class="text-white font-bold text-sm">${vid.title}</h4>
            </div>
        `;
        container.appendChild(div);
    });
    // Re-run lucide icons since we added new ones
    if (window.lucide) window.lucide.createIcons();
});
