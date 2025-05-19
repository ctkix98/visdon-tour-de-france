export function checkScreenSize() {
  const warning = document.getElementById('screen-warning');
  if (window.innerWidth < 1024) {
    warning.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  } else {
    warning.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// Vérifie au chargement
document.addEventListener('DOMContentLoaded', checkScreenSize);

// Vérifie si la fenêtre est redimensionnée
window.addEventListener('resize', checkScreenSize);
