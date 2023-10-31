import { data } from "./modules/data.js";
const contenedor = document.getElementById("contenedor-cards");
const checkbox = document.getElementById("check");
const eventos = data.events;


// funcion para crear las cards
function cardEvento(evento) {
  if (eventos.length == 0) {
    contenedor.innerHTML = `<h2>No se encontraron resultados</h2>`;
  } else {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-md-3");
    card.innerHTML = `
    <div class="col-md-4 mb-4">
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
    return card;
  }
}
//funcion para crear las categorias
function crearCategoria(categoria) {
  let cate = document.createElement("div");
  cate.classList.add("checkbox");
  cate.innerHTML = `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="${categoria}" id="flexCheckIndeterminate" name="category">
      <label class="form-check-label">
        ${categoria}
      </label>
    </div>
  `;
  return cate;
}
// funcion para filtrar eventos
function filtrosDeEventos(categoriaSeleccionadas) {
  contenedor.innerHTML = '';
  if (categoriaSeleccionadas.length === 0) {
    eventos.forEach(evento => {
      contenedor.appendChild(cardEvento(evento));
    });
  } else {
    categoriaSeleccionadas.forEach(categoria => {
      const tarjetasFiltradas = eventos.filter(evento => evento.category === categoria);
      tarjetasFiltradas.forEach(evento => {
        contenedor.appendChild(cardEvento(evento));
      });
    });
  }
}

const categoriasUnicas = new Set();

for (let evento of eventos) {
  categoriasUnicas.add(evento.category);
}

categoriasUnicas.forEach(categoria => {
  checkbox.appendChild(crearCategoria(categoria));
});


function filtrado() {
  const textoBusqueda = buscar.value;
  const checked = document.querySelectorAll('input[type=checkbox]:checked');
  const categoriasSeleccionadas = Array.from(checked).map(checkbox => checkbox.value);

  const eventosFiltrados = eventos.filter(evento => {
    const cumpleCategorias = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(evento.category);
    const cumpleTexto = evento.name.toLowerCase().includes(textoBusqueda.toLowerCase());
    return cumpleCategorias && cumpleTexto;
  });

  contenedor.innerHTML = '';

  if (eventosFiltrados.length > 0) {
    eventosFiltrados.forEach(evento => {
      contenedor.appendChild(cardEvento(evento));
    });
  } else {
    contenedor.innerHTML = `<h2>No se encontraron resultados</h2>`;
  }
}

filtrosDeEventos([]);

checkbox.addEventListener('change', filtrado);

buscar.addEventListener("keyup", filtrado);