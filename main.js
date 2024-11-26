import { renderHomePage } from './pages/homePage.js';
import { renderObserverPage } from './pages/observerPage.js';
import { renderDiagramPage } from './pages/diagramPage.js';
import { renderNavbar } from './pages/navbar.js';

// Fonction pour afficher la page selon la route
function navigateTo(route) {
    const app = document.getElementById('app');

    // Efface le contenu actuel
    app.innerHTML = renderNavbar(); // Rendre la navbar sur toutes les pages

    // Route vers la bonne page
    switch (route) {
        case '/':
            renderHomePage();
            break;
        case '/Observer':
            renderObserverPage();
            break;
        case '/Diagram':
              renderDiagramPage();
              break;
        default:
            app.innerHTML += '<h1>404 - Page non trouvée</h1>';
    }

    // Réattacher les gestionnaires d'événements à la navbar
    attachNavbarEventListeners();
}

// Gestion des clics sur les liens de navigation
function attachNavbarEventListeners() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.addEventListener('click', (event) => {
            event.preventDefault(); // Empêche le rechargement de la page

            const route = event.target.dataset.route; // Vérifie si un lien a été cliqué
            if (route) {
                window.history.pushState({}, '', route); // Met à jour l'URL
                navigateTo(route); // Change la page affichée
            }
        });
    }
}

// Gérer le retour via les boutons "Précédent" et "Suivant" du navigateur
window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname);
});

// Charge la première page au démarrage
navigateTo(window.location.pathname);
