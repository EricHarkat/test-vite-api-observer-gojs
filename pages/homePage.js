import '../stylesheet/style.css'
import '../stylesheet/navbar.css'
import javascriptLogo from '../javascript.svg'
import viteLogo from '../public/vite.svg'
import { setupCounter } from '../counter.js'
import { renderNavbar } from './navbar.js';

export function renderHomePage() {
  const app = document.querySelector('#app');

app.innerHTML  = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    ${renderNavbar()}
    <h1>Hello Vite & API Intersection Observer!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <div class="card">
      <button id="observer">API intersection Observer</button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
  <script type="module" src="/vueObserver.js"></script>
`;

document.getElementById('observer').addEventListener('click', () => {
  // Charge dynamiquement la nouvelle page
  import('./observerPage.js').then(module => {
      module.renderObserverPage();
  });
});

setupCounter(document.querySelector('#counter'))
}
