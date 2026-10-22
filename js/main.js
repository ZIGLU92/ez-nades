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