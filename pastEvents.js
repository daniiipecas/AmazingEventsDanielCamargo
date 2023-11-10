// upcoming.js

import { cardEvento, crearCategoria, contenedor, checkbox } from "./modules/funciones.js";

const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

let eventosPasados;

fetch(apiUrl)
  .then(response => response.json())
  .then(dataArray => {
    eventosPasados = filtrarEventosPasados(dataArray);  // <-- Aquí estaba el error

    const categoriasUnicas = new Set(eventosPasados.map(evento => evento.category));

    categoriasUnicas.forEach(categoria => {
      const cate = document.createElement("div");
      cate.classList.add("checkbox");
      cate.innerHTML = `
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="${categoria}" id="flexCheckIndeterminate" name="category">
          <label class="form-check-label">
            ${categoria}
          </label>
        </div>
      `;
      checkbox.appendChild(cate);
    });

    checkbox.addEventListener('change', () => {
      const checked = document.querySelectorAll('input[type=checkbox]:checked');
      const categoriasSeleccionadas = Array.from(checked).map(checkbox => checkbox.value);
      filtrarPorCategoria(categoriasSeleccionadas);
    });

    // Realizar la primera carga de eventos
    filtrarPorCategoria([]);
  })
  .catch(error => {
    console.error('Error al cargar datos desde la API:', error);
  });

function filtrarEventosPasados(dataArray) {
  const fechaActual = new Date(dataArray.currentDate);
  return dataArray.events.filter(evento => new Date(evento.date) < fechaActual);
}

function filtrarPorCategoria(categoriasSeleccionadas) {
  // Utiliza eventosPasados en lugar de eventosFuturos
  if (categoriasSeleccionadas.length === 0) {
    renderizarEventos(eventosPasados);
  } else {
    const eventosFiltrados = eventosPasados.filter(evento =>
      categoriasSeleccionadas.includes(evento.category)
    );
    renderizarEventos(eventosFiltrados);
  }
}

function renderizarEventos(eventos) {
  contenedor.innerHTML = '';
  eventos.forEach(evento => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-md-3");
    card.innerHTML = `<div class="col-md-4 mb-4">
    <div class="custom-card">
      <img src="${evento.image}" class="custom-card-img" alt="Evento">
      <div class="custom-card-body">
        <h5 class="custom-card-title">${evento.name}</h5>
        <p class="custom-card-text">${evento.description}</p>
        <h6 class="custom-card-subtitle">Price: ${evento.price}</h6>
        <a href="./Details.html?id=${evento._id}" class="btn custom-btn">Details</a>
      </div>
    </div>
  </div>
    `;
    contenedor.appendChild(card);
  });
}
