const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const eventos = data.events;

let eventoEncontrado = eventos.find(evento => evento._id == id);

const cajadetails = document.getElementById("details");

function crearCard(evento) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <main class="container mx-auto">
            <div class="row m-3 p-5 bg-info">
                <div class="col-md-8">
                    <img src="${evento.image}" alt="Imagen" class="img-fluid">
                </div>
                <div class="col-md-4 ">
                    <h2>${evento.name}</h2>
                    <ul class="col-12 " id="detalles">
                        <li><strong>Name:</strong> ${evento.name}</li>
                        <li><strong>Date:</strong> ${evento.date}</li>
                        <li><strong>Description:</strong> ${evento.description}</li>
                        <li><strong>Category:</strong> ${evento.category}</li>
                        <li><strong>Place:</strong> ${evento.place}</li>
                        <li><strong>Capacity:</strong> ${evento.capacity} seats</li>
                        <li>${evento.assistance==null?"<strong>Estimate: </strong>"+evento.estimate:"<strong>Assistance: </strong>"+evento.assistance}</li>
                        <li><strong>Price:</strong> ${evento.price}</li>
                    </ul>
                </div>
            </div>
        </main>
    `;
    cajadetails.appendChild(card);
}

crearCard(eventoEncontrado);
