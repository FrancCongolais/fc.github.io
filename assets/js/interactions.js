

document.addEventListener('DOMContentLoaded', () => {
    // ---------------------------------------------------------
    // 1. Smooth Scrolling for Navigation Links (Desktop & Mobile)
    // ---------------------------------------------------------
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                // Scroll with offset for fixed header (approx 80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ---------------------------------------------------------
    // 1.5. Scroll Spy (Active State for Navigation)
    // ---------------------------------------------------------
    const sections = document.querySelectorAll("section[id]");
    const menuLinks = document.querySelectorAll(".nav-link");

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for header detection
            const sectionId = current.getAttribute("id");
            
            // Find corresponding link
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (link) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Active State
                    link.classList.add('text-white', 'bg-white/10', 'shadow-[0_0_10px_rgba(255,255,255,0.1)]');
                    link.classList.remove('text-slate-300', 'hover:bg-white/5');
                } else {
                    // Inactive State
                    link.classList.remove('text-white', 'bg-white/10', 'shadow-[0_0_10px_rgba(255,255,255,0.1)]');
                    link.classList.add('text-slate-300', 'hover:bg-white/5');
                }
            }
        });
    }

    window.addEventListener("scroll", scrollActive);
    // Trigger once on load
    scrollActive();

    // ---------------------------------------------------------
    // 2. Video Gallery Activation
    // ---------------------------------------------------------
    // Select video cards (assuming structure from MediaGallery component)
    const videoCards = document.querySelectorAll('#media .group');
    
    videoCards.forEach(card => {
        // Check if it looks like a video card (has a play icon or duration)
        if (card.querySelector('span.font-mono') || card.querySelector('img')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const titleElement = card.querySelector('h4');
                if (titleElement) {
                    const title = titleElement.textContent.trim();
                    // Open YouTube search for the tutorial title
                    const query = encodeURIComponent(title + " Franc Congolais Crypto");
                    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
                }
            });
        }
    });

    // ---------------------------------------------------------
    // 3. Download Buttons (Whitepaper / Assets)
    // ---------------------------------------------------------
    const downloadButtons = document.querySelectorAll('a[href$=".pdf"], button');
    
    downloadButtons.forEach(btn => {
        const text = btn.textContent?.toLowerCase() || '';
        const href = btn.getAttribute('href');

        // Check if it's the specific Whitepaper file we now support
        if (href && href.includes('Projet Token.pdf')) {
            // Allow default behavior (download)
            return;
        }

        // Avoid intercepting the Assistant or Menu buttons
        if (btn.id === 'chat-toggle' || btn.id === 'mobile-menu-btn' || btn.id === 'chat-close' || btn.id === 'chat-send') return;

        if (text.includes('télécharger') || text.includes('download') || (href && href.includes('.pdf'))) {
            btn.addEventListener('click', (e) => {
                // If it's a real link that might not exist yet
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    // Check if file exists (simple simulation)
                    // For static demo, we assume files aren't uploaded yet unless specified
                    // We prevent default to avoid 404 page redirect
                    e.preventDefault();
                    alert("Le document est en cours de finalisation et sera disponible très prochainement. Merci de votre patience !");
                } else if (btn.tagName === 'BUTTON') {
                    // It's likely the "Télécharger les Assets" button
                    alert("Le pack média est en cours de préparation.");
                }
            });
        }
    });

    // ---------------------------------------------------------
    // 4. Image Gallery Activation
    // ---------------------------------------------------------
    const galleryImages = document.querySelectorAll('#media .grid img');
    galleryImages.forEach(img => {
        img.parentElement.addEventListener('click', () => {
            const src = img.getAttribute('src');
            if (src) {
                window.open(src, '_blank');
            }
        });
    });

    // ---------------------------------------------------------
    // 5. "Lire en ligne" Button
    // ---------------------------------------------------------
    const readOnlineBtns = document.querySelectorAll('a');
    readOnlineBtns.forEach(btn => {
        if (btn.textContent?.includes('Lire en ligne')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                alert("La version web du Whitepaper sera bientôt intégrée directement sur cette page.");
            });
        }
    });
});
