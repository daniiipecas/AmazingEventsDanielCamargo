// home.js

import { cardEvento, crearCategoria, contenedor, checkbox, filtrosDeEventos, filtrarPorTexto, btnBuscar } from "./modules/funciones.js";

let eventos;  

const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(apiUrl)
    .then(response => response.json())
    .then(dataArray => {
        eventos = Array.isArray(dataArray) ? dataArray[0].events : (dataArray.events ? dataArray.events : []);
        
        const categoriasUnicas = new Set();
        eventos.forEach(evento => {
            categoriasUnicas.add(evento.category);
        });

        categoriasUnicas.forEach(categoria => {
            checkbox.appendChild(crearCategoria(categoria));
        });

        checkbox.addEventListener('change', () => {
            const checked = document.querySelectorAll('input[type=checkbox]:checked');
            const categoriasSeleccionadas = Array.from(checked).map(checkbox => checkbox.value);
            filtrosDeEventos(categoriasSeleccionadas, eventos);
        });

        // Realizar la primera carga de eventos
        filtrosDeEventos([], eventos);
    })
    .catch(error => {
        console.error('Error al cargar datos desde la API:', error);
    });

btnBuscar.addEventListener('click', () => {
    const textoBusqueda = buscar.value;  // Asegúrate de que buscar esté definido o usa btnBuscar según tu HTML
    filtrarPorTexto(textoBusqueda, eventos);
});
