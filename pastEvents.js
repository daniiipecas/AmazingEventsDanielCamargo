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
    card.innerHTML = `
      <div class="col-md-3">
        <div class="card" style="width: 18rem;">
          <img src=${evento.image} class="card-img-top img-fluid" alt="...">
          <div class="card-body">
            <h5 class="card-title">${evento.name}</h5>
            <p class="card-text">${evento.description}</p>
            <div class="d-flex justify-content-around align-items-center">
              <h6 class="card-subtitle mt-2">Price: ${evento.price}</h6>
              <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
            </div>
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

