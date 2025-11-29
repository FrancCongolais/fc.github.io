// gallery.js
const images = [
    { url: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=500", title: "Numérisation" },
    { url: "https://images.unsplash.com/photo-1519074002996-a69e7ac6e0ed?auto=format&fit=crop&w=500", title: "Kinshasa" },
    { url: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=500", title: "Paiements" },
    { url: "https://images.unsplash.com/photo-1622630998477-20aa696fa4f5?auto=format&fit=crop&w=500", title: "Sécurité" },
    { url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=500", title: "Communauté" },
    { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500", title: "Croissance" },
];

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('image-gallery');
    if (!container) return;
    
    images.forEach(img => {
        const div = document.createElement('div');
        div.className = "group relative aspect-square overflow-hidden bg-slate-900 cursor-pointer rounded-lg";
        div.innerHTML = `
            <img src="${img.url}" alt="${img.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100">
            <div class="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950 to-transparent">
                <span class="text-white font-bold text-sm">${img.title}</span>
            </div>
        `;
        container.appendChild(div);
    });
});
