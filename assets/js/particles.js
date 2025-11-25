// particles.js - export default function
export default function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let cfg = {
    particle: { count: 80, minSize: 1, maxSize: 3, speed: 0.6, color: 'rgba(14,165,233,0.75)' },
    link: { distance: 120, width: 0.8, color: 'rgba(14,165,233,0.12)' }
  };

  // try load config.json if available
  fetch('assets/js/config/particles-config.json')
    .then(res => res.json())
    .then(json => { cfg = json; })
    .catch(() => { /* keep defaults */ })
    .finally(() => {
      resize();
      createParticles();
      animate();
    });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (cfg.particle.maxSize - cfg.particle.minSize) + cfg.particle.minSize;
      this.vx = (Math.random() - 0.5) * cfg.particle.speed;
      this.vy = (Math.random() - 0.5) * cfg.particle.speed;
      this.alpha = Math.random() * 0.5 + 0.25;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = cfg.particle.color;
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.round(cfg.particle.count * (window.devicePixelRatio > 1 ? 0.9 : 1));
    for (let i = 0; i < count; i++) particles.push(new Particle());
  }

  function connect() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist2 = dx * dx + dy * dy;
        const max = cfg.link.distance * cfg.link.distance;
        if (dist2 < max) {
          ctx.beginPath();
          ctx.strokeStyle = cfg.link.color;
          ctx.lineWidth = cfg.link.width;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connect();
    requestAnimationFrame(animate);
  }
}
