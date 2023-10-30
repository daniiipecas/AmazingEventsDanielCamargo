const contenedor = document.getElementById("contenedor-cards");
const eventos = data.events;

const fechaActual = new Date(data.currentDate);

const eventosPasados = eventos.filter(evento => {
  const fechaEvento = new Date(evento.date);
  return fechaEvento < fechaActual;
});
for (let evento of eventos) {
  const fechaEvento = new Date(evento.date);

  if (fechaEvento < fechaActual) {
      eventosPasados.push(evento);
  }
}

contenedor.innerHTML = ""; 

for (let evento of eventosPasados) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div class="col-sm-6">
        <div class="card" style="width: 18rem;">
            <img src="${evento.image}"
                class="card-img-top img-fluid" alt="...">
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
}

// Resto del código para crear checkboxes y el formulario de búsqueda

const checkbox = document.getElementById("check");
const categorias = data.events;

// Usar un conjunto para almacenar categorías únicas
const categoriasUnicas = new Set();

for (let evento of categorias) {
  categoriasUnicas.add(evento.category);
}

categoriasUnicas.forEach((categoria) => { // Utiliza una variable diferente, por ejemplo "categoria"
  const card = document.createElement("div");
  card.classList.add("checkbox");
  card.innerHTML = `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="${categoria}" id="flexCheckIndeterminate" name="category">
      <label class="form-check-label" for="flexCheckIndeterminate">
        ${categoria}
      </label>
    </div>
    `;
  checkbox.appendChild(card);
});
checkbox.addEventListener('change', () => {
  const checked = document.querySelectorAll('input[type=checkbox]:checked');
  const categoriasSeleccionadas = Array.from(checked).map(checkbox => checkbox.value);
  contenedor.innerHTML = '';
  
  if (categoriasSeleccionadas.length === 0) {
    // Si no se seleccionan categorías, muestra todos los eventos
    data.events.forEach(evento => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card");
      tarjeta.innerHTML = `
      <div class="row">
                <div class="col-12">
        <div class="col-md-2">
          <div class="card" style="width: 13rem;">
            <img src=${evento.image} class="img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${evento.name}</h5>
              <p class="card-text">${evento.description}</p>
              <div class="d-flex justify-content-around align-items-center">
                <h6 class="card-subtitle mt-2">Price:${evento.price}</h6>
                <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
      contenedor.appendChild(tarjeta);
    });
  } else {
  categoriasSeleccionadas.forEach(categoria => { // Cambia "categorias" a "categoria"
    const tarjetasseleccionadas = data.events.filter(evento => evento.category === categoria);
    tarjetasseleccionadas.forEach(evento => {
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("card");
      tarjeta.innerHTML = `
      <div class="row">
                <div class="col-12">
        <div class="col-md-2">
          <div class="card" style="width: 13rem;">
            <img src=${evento.image} class="img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${evento.name}</h5>
              <p class="card-text">${evento.description}</p>
              <div class="d-flex justify-content-around align-items-center">
                <h6 class="card-subtitle mt-2">Price:${evento.price}</h6>
                <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
              </div>
            </div>
          </div>
        </div>
      </div>
        `;
      contenedor.appendChild(tarjeta);
    })
  })
  }
});
const busquedaForm = document.createElement("form");
busquedaForm.classList.add("d-inline-flex", "ml-auto", "align-items-center");
busquedaForm.innerHTML = `
  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success" type="submit">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  </button>
`;// Agregar un evento de escucha al formulario de búsqueda
busquedaForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evitar que se envíe el formulario

  const inputElemento = busquedaForm.querySelector("input");
  const searchTerm = inputElemento.value.toLowerCase(); // Obtener el término de búsqueda en minúsculas

  // Filtrar los eventos que coinciden con el término de búsqueda
  const eventosFiltrados = eventos.filter((evento) => {
    // Normalizar el nombre del evento: primera palabra en mayúscula, las demás en minúscula
    const nombreEvento = evento.name.split(" ").map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        return word.toLowerCase();
      })
      .join(" ");

    return nombreEvento.includes(searchTerm);
  });

  // Limpia el contenedor antes de mostrar los eventos filtrados
  contenedor.innerHTML = "";

  if (eventosFiltrados.length === 0) {
    // Muestra un mensaje si no hay coincidencias
    const mensaje = document.createElement("div");
    mensaje.textContent = "No se encontraron eventos que coincidan con la búsqueda.";
    contenedor.appendChild(mensaje);
  } else {
    // Muestra los eventos filtrados
    eventosFiltrados.forEach((evento) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
  <button class="btn btn-outline-success" type="submit">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
    </svg>
  </button>
      `;

      checkbox.appendChild(busquedaForm);
    });
  }
});

