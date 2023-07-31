// ==UserScript==
// @name        New script - holded.com
// @namespace   Violentmonkey Scripts
// @match       https://app.holded.com/projects/view
// @grant       none
// @version     1.0
// @author      -
// @description 7/23/2023, 10:04:25 PM
// ==/UserScript==

// Usage
function setupMutationObserver() {
  const targetNode = document.getElementById('loader');

  const observer = new MutationObserver(function (mutationsList, observer) {
    // Mostrar un mensaje en la consola cuando se detecten cambios en el DOM
    const targetNode = document.querySelector('.all.sorting_desc').click();

    setTimeout(() => {
      // Filtrar solo por los favoritos
      document.querySelector('.hh-segments .dropdown-menu li:nth-child(2) a').click();
    }, 1000);
  });

  // Configuración del observer para observar cambios en atributos y contenido del nodo
  const config = { attributes: true, childList: true, subtree: true };

  // Comenzar a observar el nodo target con la configuración especificada
  observer.observe(targetNode, config);
}

setupMutationObserver();