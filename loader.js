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
function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document, {
          childList: true,
          subtree: true
      });
  });
}

waitForElm('#loader img').then((elm) => {
  document.querySelector("#loader img").setAttribute("src",'https://media.tenor.com/od9KTThn64oAAAAM/adventure-time-jake-the-dog.gif');

});
waitForElm('#root div').then((elm) => {
  document.querySelector('#root div').innerHTML = "<img src='https://media.tenor.com/od9KTThn64oAAAAM/adventure-time-jake-the-dog.gif' style='top: 50%; left: 50%; margin-top:45vh'></img>"

});
function insertarCSS(elemento, css) {
var styleElement = document.createElement('style');
styleElement.innerHTML = css;
elemento.appendChild(styleElement);
}

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
/* --------------- Inicio Cambio Estilos Página ------------------- */
/* Body */
body,
.projectgeneral-container,
.modal-body,
.modal-content,
.htable th, .columns-selector
{
    background-color: #282936 !important;
}

/* Menu */
.topbar-dsm, .card__sidebar, topbar-dsm {
    background-color: #313241!important;
}

/* SubMenu */
.sub-menu {
    background-color: #313241!important;
}
.sub-menu * {
    color: #fff!important;
}

.sub-menu *{
  color: #039aab !important;
  font-size: 16px !important;
}

/* Botones */
.button, .column__add, .btn,
.select2-container a,
.settingsitem{
    background: #037e8b !important;
    color: #fff !important;
    border: none;
}

/* Letras Moradas */
.editableContent,
#card-reference,
#card-list,
.card__location, .htable th,
.task__date, .c-card__footer * {
   color:  #b45bcf !important;
}

/* Fila Tabla */
.subtask:hover,
.task:hover,
.table.table-hover tbody tr:hover td,
.table.table-hover tbody tr:hover div:not(.text-center *,  .title *), .c-card,
.navbar-item.active > a,
.navbar-item:hover > a{
    background: #32002c !important;
}


/* Hover Fila Tabla */
.htable th.sorting:hover, .htable th.sorting_desc:hover, .htable th.sorting_asc:hover{
    color: #ebff87 !important;
}

/* Texto blanco */
.wysiwyg-placeholder,
.section__title,
.modal-content,
#card-description span{
   color: #b3b1b1 !important;
}

/* Texto Rosa */
.topbar-dsm-title-main, .dataTables_info, #subview-content,
.c-list__add{
   color: #d63384 !important;
}

/* Fondo Oscuro Redondeado */
.panel .panel-body,
.wysiwyg-placeholder, .comment__body,
.hh-box-inner,
.odd *:not(.text-center *,  .title *),
.htable tfoot *, #subview-content,
.placeholder-row *{
    background-color: #1a1a21 !important;
    color: #b3b1b1;
    font-size: 14px;

}

.even *:not(.text-center *, .title *), .c-list{
   background: #201a25 !important;
   color: #b3b1b1;
   font-size: 14px;
}

/* SIN Borde */
.panel .panel-body,
.wysiwyg-placeholder,
.comment__body,
.card__sidebar,
.modal-body,
.card__main,
.modal-content,
.table tbody tr td,
.htable tfoot,
.c-card,
.task{
    border: none !important;
}

/* Borde Redondeado */
.panel .panel-body,
.wysiwyg-placeholder,
.comment__body,
.card__sidebar,
.modal-body,
.card__main,
.modal-content{
     border-radius: 10px !important;
}

#loader img{
  width: auto; height: auto;
}

.task__title{
    color: #a1efe4 !important;
}


h2{
  font-size: 40px;
  color: #d63384 !important;
}

h3{
  font-size: 30px;
  color: #b45bcf !important;
}

h4{
  font-size: 20px;
  color: #ebff87 !important;
}
h5{
  font-size: 20px;
  color: #62d6e8 !important;
}

::-webkit-scrollbar {
    width: 10px !important;
    height: 10px !important;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey !important;
    border-radius: 10px !important;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #039aab99 !important;
    transition: 2s !important;
    border-radius: 10px !important;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #039aab !important;
}
`;

insertarCSS(miElemento, miCSS);

// ----------------------------- Ordenar Tareas --------------------------------------
function ordenarTareas(listContainer) {
// Obtener todas las tareas y almacenarlas en un array
// console.log(listContainer)
const tasks = Array.from(listContainer.querySelectorAll('.task'));
const priority = {
  'rgb(202, 52, 14)' : 1,
  'rgb(245, 115, 73)': 2,
  'rgb(239, 214, 81)': 3,
  'rgb(72, 152, 59)' : 4,
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

window.onload = () =>{
let lists = Array.from(document.querySelectorAll('.list'));

lists.forEach(list => ordenarTareas(list));

}