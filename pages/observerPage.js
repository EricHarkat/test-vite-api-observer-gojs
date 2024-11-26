import '../stylesheet/style.css'
import '../stylesheet/observer.css'
import { setupObserver } from '../observer.js'



export function renderObserverPage() {
  const app = document.getElementById('app');
  app.innerHTML = `
      <div class="container">
        <div class="box observed">Scroll down</div>
        <div class="box target observed">I am being observed!</div>
        <div class="box observed">Another box</div>
      </div>
      <div>
        <a id="goBack" href="#">Retour à la page d'accueil</a>
      </div>
  `;
  setupObserver(document.querySelectorAll('.box'))

  document.getElementById('goBack').addEventListener('click', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Met à jour l'URL pour refléter la page d'accueil
    window.history.pushState({}, '', '/');

    // Recharge la page principale
    import('./homePage').then(module => {
        module.renderHomePage();
    });
});
}