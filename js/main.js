// ---------- Mémoire du navigateur (localStorage) ----------
const CLE = 'eznades-';

function lireListe(nom) {
  try {
    return JSON.parse(localStorage.getItem(CLE + nom)) || [];
  } catch (erreur) {
    return [];
  }
}

function ecrireListe(nom, liste) {
  try {
    localStorage.setItem(CLE + nom, JSON.stringify(liste));
  } catch (erreur) {
    // stockage indisponible (navigation privée…) : la démo continue sans sauvegarde
  }
}

// ---------- Boutons Valider / Favoris ----------
const idNade = document.body.dataset.nade;

function afficherEtat(bouton, actif) {
  bouton.classList.toggle('est-actif', actif);
  bouton.setAttribute('aria-pressed', actif);
  bouton.querySelector('.action__texte').textContent =
    actif ? bouton.dataset.texteOn : bouton.dataset.texteOff;
  bouton.querySelector('.action__icone').textContent =
    actif ? bouton.dataset.iconeOn : bouton.dataset.iconeOff;
}

if (idNade) {
  document.querySelectorAll('[data-bascule]').forEach((bouton) => {
    const nom = bouton.dataset.bascule;
    afficherEtat(bouton, lireListe(nom).includes(idNade));

    bouton.addEventListener('click', () => {
      let liste = lireListe(nom);
      const actif = !liste.includes(idNade);
      liste = actif ? [...liste, idNade] : liste.filter((id) => id !== idNade);
      ecrireListe(nom, liste);
      afficherEtat(bouton, actif);
    });
  });
}

// ---------- Barres de progression ----------
function afficherProgressions() {
  const validees = lireListe('validees');

  document.querySelectorAll('[data-progression]').forEach((bloc) => {
    const map = bloc.dataset.progression;
    const total = Number(bloc.dataset.total);
    const faites = validees.filter((id) => id.startsWith(map + '-')).length;
    const pct = Math.round((faites / total) * 100);

    bloc.querySelector('.barre__remplie').style.width = pct + '%';
    bloc.querySelector('.barre__pourcent').textContent = pct + '%';
  });
}

afficherProgressions();
window.addEventListener('pageshow', (e) => {
  if (e.persisted) afficherProgressions();
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
// Formulaire de contact : pré-remplissage depuis l'adresse de la page
const champObjet = document.querySelector('#objet');
const champMessage = document.querySelector('#message');

if (champObjet && champMessage) {
  const params = new URLSearchParams(window.location.search);

  if (params.has('map')) {
    const nade = `${params.get('type')} sur ${params.get('map')} – ` +
                 `${params.get('emplacement')} – ${params.get('localisation')} – ${params.get('niveau')}`;

    champObjet.value = `Erreur sur la ${nade}`;
    champMessage.value = [
  'Salut !',
  `J’ai remarqué une erreur sur la ${nade}.`,
  'Cordialement',
].join('\n\n');
  }
}