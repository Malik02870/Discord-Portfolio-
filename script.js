/* VOLTERRA — dependency-free navigation and project galleries. */
'use strict';
const projects = [
  {
    "name": "Gaming Hub",
    "category": "Gaming community",
    "description": "A dedicated gaming space with organized game channels, private team areas, community roles, and a branded welcome experience.",
    "features": [
      "Channel architecture",
      "Role hierarchy",
      "Tickets & bot setup"
    ],
    "images": [
      1,
      2,
      3,
      4,
      5,
      6
    ],
    "cover": 6
  },
  {
    "name": "VOLTERRA Community",
    "category": "Development community",
    "description": "Our own community, bringing service discovery, project discussions, support tickets, and developer roles into one organized space.",
    "features": [
      "Service channels",
      "Support tickets",
      "Welcome embeds"
    ],
    "images": [
      7,
      8,
      9,
      10,
      11
    ],
    "cover": 8
  },
  {
    "name": "VEXEN.EXE",
    "category": "Gaming & guild server",
    "description": "A gaming-focused setup with verification, guild and esports areas, private voice channels, logging, and a coordinated bot configuration.",
    "features": [
      "Verification",
      "Guild & team channels",
      "Logging & bot setup"
    ],
    "images": [
      12,
      13,
      14,
      15,
      16,
      17,
      26
    ],
    "cover": 26
  },
  {
    "name": "Cuties",
    "category": "Social community",
    "description": "A welcoming social server with public and private community spaces, a detailed role hierarchy, verification, and a custom welcome message.",
    "features": [
      "Community layout",
      "Role organization",
      "Verification & welcome"
    ],
    "images": [
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25
    ],
    "cover": 24
  }
];
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileMenu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open menu');
}
menuButton.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
let gallery = null;
let returnFocus = null;
const icons = {
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6"/></svg>',
  previous: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'
};
function imagePath(number) { return 'assets/screenshot-' + String(number).padStart(2, '0') + '.webp'; }
function closeGallery() {
  document.querySelector('.lightbox')?.remove();
  gallery = null;
  returnFocus?.focus();
}
function renderGallery() {
  if (!gallery) return;
  const project = projects[gallery.project];
  let overlay = document.querySelector('.lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `<div class="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
      <div class="gallery-header"><div><h3 id="gallery-title"></h3><p class="gallery-category"></p></div>
      <button class="icon-button" aria-label="Close gallery">${icons.close}</button></div>
      <div class="gallery-stage"><button class="icon-button" aria-label="Previous screenshot">${icons.previous}</button>
      <img class="gallery-image" alt=""><button class="icon-button" aria-label="Next screenshot">${icons.next}</button></div>
      <div class="gallery-thumbs"></div><p class="gallery-counter"></p></div>`;
    document.body.append(overlay);
    overlay.addEventListener('click', event => { if (event.target === overlay) closeGallery(); });
    overlay.querySelector('[aria-label="Close gallery"]').addEventListener('click', closeGallery);
    overlay.querySelector('[aria-label="Previous screenshot"]').addEventListener('click', () => moveGallery(-1));
    overlay.querySelector('[aria-label="Next screenshot"]').addEventListener('click', () => moveGallery(1));
    overlay.querySelector('[aria-label="Close gallery"]').focus();
  }
  overlay.querySelector('#gallery-title').textContent = project.name;
  overlay.querySelector('.gallery-category').textContent = project.category;
  const image = overlay.querySelector('.gallery-image');
  image.src = imagePath(project.images[gallery.image]);
  image.alt = project.name + ' screenshot ' + (gallery.image + 1);
  overlay.querySelector('.gallery-counter').textContent = (gallery.image + 1) + ' / ' + project.images.length;
  const thumbs = overlay.querySelector('.gallery-thumbs');
  if (!thumbs.children.length) project.images.forEach((number, index) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Show screenshot ' + (index + 1));
    const thumb = document.createElement('img');
    thumb.src = imagePath(number); thumb.alt = '';
    button.append(thumb);
    button.addEventListener('click', () => { gallery.image = index; renderGallery(); });
    thumbs.append(button);
  });
  [...thumbs.children].forEach((button,index) => {
    button.classList.toggle('selected', index === gallery.image);
    button.setAttribute('aria-pressed', String(index === gallery.image));
  });
}
function moveGallery(direction) {
  if (!gallery) return;
  const count = projects[gallery.project].images.length;
  gallery.image = (gallery.image + direction + count) % count;
  renderGallery();
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => {
  returnFocus = button;
  gallery = { project: Number(button.dataset.project), image: 0 };
  renderGallery();
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closeGallery(); closeMenu(); }
  if (!gallery) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); moveGallery(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); moveGallery(1); }
  if (event.key === 'Tab') {
    const buttons = [...document.querySelectorAll('.lightbox button')];
    const first = buttons[0], last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
const copyright = document.querySelector('.footer-bottom span');
copyright.textContent = '© ' + new Date().getFullYear() + ' VOLTERRA. All rights reserved.';


// Subtle 3D pointer tilt, scroll reveals and hero parallax. All effects fail gracefully.
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hero = document.querySelector('.hero.has-3d');
  const orb = document.querySelector('.volterra-orb');
  if (!reducedMotion && finePointer && hero && orb) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      orb.style.marginLeft = `${x * 12}px`;
      orb.style.marginTop = `${y * 10}px`;
      orb.style.filter = `drop-shadow(${x * -10}px ${y * -8}px 38px #8b5cf644)`;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => {
      orb.style.marginLeft = '0'; orb.style.marginTop = '0';
      orb.style.filter = '';
    }, { passive: true });
    document.querySelectorAll('.service-card, .project-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty('--tilt-y', `${(x - .5) * 5}deg`);
        card.style.setProperty('--tilt-x', `${(.5 - y) * 4}deg`);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg'); card.style.setProperty('--tilt-y', '0deg');
      }, { passive: true });
    });
  }

  const revealTargets = document.querySelectorAll('.section-heading, .service-card, .project-card, .package, .process-step, .contact-inner, .about-layout, .faq-layout');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-ready');
    revealTargets.forEach((element, index) => {
      element.classList.add('reveal-on-scroll');
      if (element.matches('.service-card, .project-card, .package, .process-step')) {
        element.style.transitionDelay = `${(index % 3) * 70}ms`;
      }
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealTargets.forEach(element => observer.observe(element));
  }
})();
