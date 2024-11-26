import go from 'gojs';

export function renderDiagramPage() {
  const app = document.getElementById('app');

  // Nettoie le contenu existant
  app.innerHTML = `
    <div>
      <h1>GoJS Diagram</h1>
      <p>Test diagramme GoJS simple.</p>
      <div id="diagramDiv" style="width: 1000px; height: 700px; border: 1px solid black;"></div>
      <a id="goBack" href="#">Retour à la page d'accueil</a>
    </div>
  `;

  // Initialise le diagramme GoJS
  const $ = go.GraphObject.make; // Shortcut pour créer des objets GoJS

  const diagram = $(go.Diagram, 'diagramDiv', {
    'undoManager.isEnabled': true, // Active l'annulation
  });

  // Définition des nœuds avec le statut
  diagram.nodeTemplate = $(
    go.Node,
    'Auto', // Dispose les éléments automatiquement
    $(go.Shape, 'RoundedRectangle', {
      strokeWidth: 0,
    },
    new go.Binding('fill', 'color') // Lie la couleur au champ 'color'
    ),
    $(
      go.Panel,
      'Vertical', // Organise les textes verticalement
      $(go.TextBlock, 
        { margin: 6, font: 'bold 14px Arial', stroke: '#333' }, 
        new go.Binding('text', 'key') // Affiche le nom
      ),
      $(go.TextBlock, 
        { margin: 4, font: 'italic 12px Arial', stroke: '#666' }, 
        new go.Binding('text', 'status') // Affiche le statut
      )
    )
  );

  // Définit les liens entre les nœuds
  diagram.linkTemplate = $(
    go.Link,
    { routing: go.Link.AvoidsNodes, curve: go.Link.JumpOver }, // Lien qui évite les nœuds
    $(go.Shape), // Ligne du lien
    $(go.Shape, { toArrow: 'Standard' }) // Flèche du lien
  );

  // Données du modèle avec les statuts
  diagram.model = new go.GraphLinksModel(
    [
      { key: 'P-A', status: 'Manager', color: 'Lightblue' },
      { key: 'Adrien', status: 'Manager', color: 'Lightblue' },
      { key: 'Bérénice', status: 'Manager', color: 'Lightblue', group: 'PROJECT TEAM' },
      { key: 'Yana', status: 'Manager', color: 'Lightblue', group: 'PROJECT TEAM' },
      { key: 'Olivier', status: 'Manager', color: 'Lightblue', group: 'PROJECT TEAM' },
      { key: 'Remi', status: 'Senior Analyst', color: 'Lightblue', group: 'PROJECT TEAM' },
      { key: 'Anne-Sophie', status: 'Analyst', color: 'Lightblue', group: 'PROJECT TEAM' },
      { key: 'Laura', status: 'Senior Analyst', color: 'Lightblue', group: 'MARKETING TEAM' },
      { key: 'Lucas', status: 'Marketing Manager', color: 'Lightblue', group: 'MARKETING TEAM' },
      { key: 'MaximeC', status: 'Manager', color: 'Lightblue', group: 'IT TEAM' },
      { key: 'Eric', status: 'Développeur Full Stack', color: 'pink', group: 'IT TEAM' },
      { key: 'Axel', status: 'Développeur Full Stack', color: 'pink', group: 'IT TEAM' },
      { key: 'MaximeM', status: 'Data Scientist', color: 'orange',color: 'pink', group: 'IT TEAM' },
      { key: 'IT TEAM', isGroup: true },
      { key: 'PROJECT TEAM', isGroup: true },
      { key: 'MARKETING TEAM', isGroup: true },
    ],
    [   
      { from: 'P-A', to: 'Adrien' },
      { from: 'P-A', to: 'PROJECT TEAM' },
      { from: 'P-A', to: 'MARKETING TEAM' },
      { from: 'Adrien', to: 'IT TEAM' },
      { from: 'MaximeC', to: 'Eric' },
      { from: 'Eric', to: 'Axel' },
      { from: 'MaximeC', to: 'Axel' },
      { from: 'MaximeC', to: 'MaximeM' },
      { from: 'Olivier', to: 'Laura' },
    ]
  );

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

