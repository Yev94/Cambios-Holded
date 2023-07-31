// ==UserScript==
// @name        New script - holded.com loader
// @namespace   Violentmonkey Scripts
// @match       https://app.holded.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 7/23/2023, 11:40:15 PM
// ==/UserScript==

// ------------------------------------ Insertar el CSS dentro del elemento ----------------------------
function insertarCSS(elemento, css) {
  var styleElement = document.createElement('style');
  styleElement.innerHTML = css;
  elemento.appendChild(styleElement);
}
// ------------------------- Ordenar Contenido info Tarea --------------------------------------
// Elemento donde queremos insertar el CSS
var miElemento = document.querySelector('head');

// CSS que queremos insertar
var miCSS = `
  /* ------- Inicio Cambio Posición Contenido Tarea ------------------ */
  
  .task__row {
      flex: 0 !important;
      flex-direction: row-reverse;
      overflow: inherit !important;
  }
  
  .task__ref{
     display:none !important;
  }
  /* ---------- Fin Cambio Posición Contenido Tarea ------------------ */
  `;

insertarCSS(miElemento, miCSS);

// ----------------------------- Ordenar Tareas --------------------------------------
function ordenarTareas(listContainer) {
  // Obtener todas las tareas y almacenarlas en un array
  // console.log(listContainer)
  const tasks = Array.from(listContainer.querySelectorAll('.task'));
  const priority = {
    'rgb(202, 52, 14)': 1,
    'rgb(245, 115, 73)': 2,
    'rgb(239, 214, 81)': 3,
    'rgb(72, 152, 59)': 4,
    'rgb(103, 216, 97)': 5,
    'default': 6
  }
  // Asignar la prioridad de cada tarea (extraída del atributo de la flecha)
  tasks.forEach(task => {
    const arrowElement = task.querySelector('.task__priority i');
    // console.log(arrowElement);

    const colorArrow = arrowElement?.style.color;

    let numPriority = (priority[colorArrow] || priority['default']);
    task.setAttribute('data-priority', numPriority);
  });

  // Ordenar las tareas según su prioridad (de alta a baja)
  tasks.sort((a, b) => {
    const priorityA = parseInt(a.getAttribute('data-priority'));
    const priorityB = parseInt(b.getAttribute('data-priority'));
    return priorityA - priorityB; // Ordenar de menor a mayor prioridad
  });

  // Agregar las tareas ordenadas al contenedor
  tasks.forEach(task => listContainer.appendChild(task));
}

window.onload = () => {
  let lists = Array.from(document.querySelectorAll('.list'));

  lists.forEach(list => ordenarTareas(list));

}