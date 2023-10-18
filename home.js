const contenedor = document.getElementById("contenedor-cards");
const eventos = data.events;
const fechaActual = new Date(data.currentDate); 

const eventosPasados = [];

for (let evento of eventos) {
    const fechaEvento = new Date(evento.date);

    if (fechaEvento < fechaActual) {
        eventosPasados.push(evento);
    }
}

for (let evento of eventosPasados) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <div class="col-md-2">
            <div class="card" style="width: 18rem;">
                <img src=${evento.image}
                    class="img-fluid" alt="...">
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
    `;

    contenedor.appendChild(card);
}
