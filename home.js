const contenedor = document.getElementById("contenedor-cards");
const eventos = data.events;

for (let evento of eventos) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
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
            <a href="./Details.html" class="btn btn-primary">Details</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Repite este bloque para las siguientes 4 tarjetas -->
  </div>

    `;

    contenedor.appendChild(card);
}
