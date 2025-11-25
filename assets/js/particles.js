export function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    let config = {};

    // Charger configuration JSON
    fetch("assets/js/config/particles-config.json")
        .then(res => res.json())
        .then(data => {
            config = data;
            resizeCanvas();
            createParticles();
            animate();
        });

    // Adapter la taille du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", () => {
        resizeCanvas();
        createParticles();
    });

    // Classe Particule
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = random(config.particle.minSize, config.particle.maxSize);
            this.speedX = random(-config.particle.speed, config.particle.speed);
            this.speedY = random(-config.particle.speed, config.particle.speed);
            this.color = config.particle.color;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x <= 0 || this.x >= canvas.width) this.speedX *= -1;
            if (this.y <= 0 || this.y >= canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // Helpers
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Création des particules
    function createParticles() {
        particles = [];
        for (let i = 0; i < config.particle.count; i++) {
            particles.push(new Particle());
        }
    }

    // Lignes de connexion
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < config.link.distance) {
                    ctx.strokeStyle = config.link.color;
                    ctx.lineWidth = config.link.width;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        connectParticles();
        requestAnimationFrame(animate);
    }
}
