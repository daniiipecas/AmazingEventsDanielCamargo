// funciones.js

export const contenedor = document.getElementById("contenedor-cards");
export const checkbox = document.getElementById("check");
export const btnBuscar = document.getElementById('btnBuscar');

export function cardEvento(evento) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("col-md-3");

    if (evento && evento.name && evento.image && evento.description && evento.price && evento._id) {
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
    } else {
        card.innerHTML = `<h2>No se encontraron resultados</h2>`;
    }

    return card;
}

export function crearCategoria(categoria) {
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

export function filtrosDeEventos(categoriasSeleccionadas, eventos) {
    contenedor.innerHTML = '';
    if (categoriasSeleccionadas.length === 0) {
        eventos.forEach(evento => {
            contenedor.appendChild(cardEvento(evento));
        });
    } else {
        categoriasSeleccionadas.forEach(categoria => {
            const tarjetasFiltradas = eventos.filter(evento => evento.category === categoria);
            tarjetasFiltradas.forEach(evento => {
                contenedor.appendChild(cardEvento(evento));
            });
        });
    }
}

export function filtrarPorTexto(textoBusqueda, eventos) {
    const eventosFiltrados = eventos.filter(evento =>
        evento.name.toLowerCase().includes(textoBusqueda.toLowerCase())
    );

    contenedor.innerHTML = '';

    if (eventosFiltrados.length > 0) {
        eventosFiltrados.forEach(evento => {
            contenedor.appendChild(cardEvento(evento));
        });
    } else {
        contenedor.innerHTML = `<h2>No se encontraron resultados</h2>`;
    }
}
