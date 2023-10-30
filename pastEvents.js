const contenedor = document.getElementById("contenedor-cards");
const checkbox = document.getElementById("check");
const buscador = document.getElementById("buscar"); 

// Obtén la lista de eventos y la fecha actual
const eventos = data.events;
const fechaActual = new Date(data.currentDate);

// Filtra los eventos futuros.
const eventosPasados = eventos.filter(evento => new Date(evento.date) < fechaActual);

// Función para renderizar las tarjetas de eventos.
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

// Función para filtrar eventos por categoría.
function filtrarPorCategoria(categoriasSeleccionadas) {
  if (categoriasSeleccionadas.length === 0) {
    // Si no se seleccionan categorías, muestra todos los eventos futuros.
    renderizarEventos(eventosPasados);
  } else {
    const eventosFiltrados = eventosPasados.filter(evento =>
      categoriasSeleccionadas.includes(evento.category)
    );
    renderizarEventos(eventosFiltrados);
  }
}

// Renderiza los eventos futuros al cargar la página.
renderizarEventos(eventosPasados);

// Lógica para los checkboxes de categorías.
const categoriasUnicas = new Set(eventos.map(evento => evento.category));

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

// Lógica para la búsqueda por nombre de evento
buscador.addEventListener("keyup", () => {
  const textoBusqueda = buscador.value.toLowerCase();
  const eventosFiltrados = eventosPasados.filter(evento =>
    evento.name.toLowerCase().includes(textoBusqueda)
  );
  renderizarEventos(eventosFiltrados);
});

