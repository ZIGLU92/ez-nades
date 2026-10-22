// Boutons qui changent d'état au clic (Valider la nade, Ajouter aux favoris)
document.querySelectorAll('[data-bascule]').forEach((bouton) => {
  const texte = bouton.querySelector('.action__texte');
  const icone = bouton.querySelector('.action__icone');

  bouton.addEventListener('click', () => {
    const actif = bouton.classList.toggle('est-actif');
    bouton.setAttribute('aria-pressed', actif);
    texte.textContent = actif ? bouton.dataset.texteOn : bouton.dataset.texteOff;
    icone.textContent = actif ? bouton.dataset.iconeOn : bouton.dataset.iconeOff;
  });
});
// Menu burger (mobile)
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');

if (header && burger) {
  const fermer = () => {
    header.classList.remove('menu-ouvert');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Ouvrir le menu');
  };

  burger.addEventListener('click', () => {
    const ouvert = header.classList.toggle('menu-ouvert');
    burger.setAttribute('aria-expanded', ouvert);
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  // Referme le menu quand on clique sur un lien
  document.querySelectorAll('.header__nav a').forEach((lien) => {
    lien.addEventListener('click', fermer);
  });
}