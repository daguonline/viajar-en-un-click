/* ==========================================================================
   Viajar en un Click - Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initClipboardCopy();
  initNotifyForm();
  init3DTilt();
  initSkyCanvas();
});

/**
 * Clipboard Copy Handler for Contact Email
 */
function initClipboardCopy() {
  const btnCopy = document.getElementById('btnCopyEmail');
  const emailText = document.getElementById('emailText').innerText.trim();

  if (!btnCopy) return;

  btnCopy.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailText);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = emailText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // Visual feedback on button
      const originalHTML = btnCopy.innerHTML;
      btnCopy.innerHTML = `<i class="fa-solid fa-check" style="color: #4ADE80;"></i> <span>¡Copiado!</span>`;
      btnCopy.style.borderColor = 'rgba(74, 222, 128, 0.4)';

      showToast('¡Email copiado al portapapeles! 📋', 'fa-regular fa-copy');

      setTimeout(() => {
        btnCopy.innerHTML = originalHTML;
        btnCopy.style.borderColor = '';
      }, 2500);

    } catch (err) {
      console.error('Error al copiar: ', err);
      showToast('No se pudo copiar automáticamente. Email: ' + emailText, 'fa-solid fa-triangle-exclamation');
    }
  });
}

/**
 * Toast Notification System
 */
function showToast(message, iconClass = 'fa-solid fa-circle-check') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3500);
}

/**
 * Subscription Form Submission
 */
function initNotifyForm() {
  const form = document.getElementById('notifyForm');
  const feedback = document.getElementById('formFeedback');
  const emailInput = document.getElementById('userEmail');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email || !validateEmail(email)) {
      feedback.textContent = 'Por favor, ingresá un correo electrónico válido.';
      feedback.className = 'form-feedback error';
      return;
    }

    feedback.textContent = '¡Excelente! Te notificaremos apenas la web esté lista. 🚀';
    feedback.className = 'form-feedback success';
    emailInput.value = '';

    showToast('¡Te registraste correctamente! Te avisaremos pronto.', 'fa-solid fa-paper-plane');

    setTimeout(() => {
      feedback.textContent = '';
    }, 5000);
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Interactive 3D Card Tilt Effect
 */
function init3DTilt() {
  const card = document.getElementById('tiltCard');
  if (!card || window.innerWidth <= 768) return;

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate rotation (-6 to 6 degrees)
    const rotX = ((clientY - innerHeight / 2) / (innerHeight / 2)) * -4;
    const rotY = ((clientX - innerWidth / 2) / (innerWidth / 2)) * 4;

    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });

  document.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
}

/**
 * Sky Canvas Background - Animated Flight Paths & Flying Planes
 */
function initSkyCanvas() {
  const canvas = document.getElementById('skyCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particles / Stars
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.8 + 0.5,
    opacity: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.2 + 0.05
  }));

  // Airplane Object
  const planes = [
    {
      x: -50,
      y: height * 0.25,
      speed: 1.4,
      angle: Math.PI / 14,
      size: 16,
      trail: []
    },
    {
      x: -150,
      y: height * 0.7,
      speed: 0.9,
      angle: Math.PI / 18,
      size: 12,
      trail: []
    }
  ];

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Particles
    ctx.fillStyle = '#FFFFFF';
    particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) p.y = height;
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Planes & Trails
    planes.forEach(plane => {
      plane.x += Math.cos(plane.angle) * plane.speed;
      plane.y += Math.sin(plane.angle) * plane.speed;

      // Add trail point
      plane.trail.push({ x: plane.x, y: plane.y });
      if (plane.trail.length > 50) plane.trail.shift();

      // Reset plane if off screen
      if (plane.x > width + 100 || plane.y > height + 100) {
        plane.x = -80;
        plane.y = Math.random() * (height * 0.7) + height * 0.1;
        plane.trail = [];
      }

      // Draw Trail line
      if (plane.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(plane.trail[0].x, plane.trail[0].y);
        for (let i = 1; i < plane.trail.length; i++) {
          ctx.lineTo(plane.trail[i].x, plane.trail[i].y);
        }
        const grad = ctx.createLinearGradient(
          plane.trail[0].x, plane.trail[0].y,
          plane.x, plane.y
        );
        grad.addColorStop(0, 'rgba(255, 94, 43, 0)');
        grad.addColorStop(1, 'rgba(255, 107, 53, 0.4)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Airplane SVG path or simple silhouette
      ctx.save();
      ctx.translate(plane.x, plane.y);
      ctx.rotate(plane.angle);
      ctx.fillStyle = '#FF5E2B';
      ctx.globalAlpha = 0.85;

      // Simple plane shape
      ctx.beginPath();
      ctx.moveTo(12, 0);
      ctx.lineTo(-8, -8);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-8, 8);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
