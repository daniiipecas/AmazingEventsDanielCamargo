const contenedor = document.getElementById("contenedor-cards");
const checkbox = document.getElementById("check");
const buscador = document.getElementById("buscar"); // Cambiado de "busca" a "buscar"
const eventos = data.events;

function cardEvento(evento) {
  if (eventos.length == 0) {
    contenedor.innerHTML = `<h2>No se encontraron resultados</h2>`;
  } else {
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
                  <h6 class="card-subtitle mt-2">Price: ${evento.price}</h6>
                  <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    return card;
  }
}

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

function filtrado(eventos){
  let primerFiltro = filtrarTexto(eventos)
  let segundoFiltro = actualizarEventos(primerFiltro)
  cardEvento(segundoFiltro)
}

filtrosDeEventos([]);

checkbox.addEventListener('change', () => {
    const checked = document.querySelectorAll('input[type=checkbox]:checked');
    const categoriasSeleccionadas = Array.from(checked).map(checkbox => checkbox.value);
    filtrosDeEventos(categoriasSeleccionadas)
  })
  
function filtrarTexto(eventos, textoBusqueda) {
  return eventos.filter(evento => evento.name.toLowerCase().includes(textoBusqueda.toLowerCase()));
}

function actualizarEventos() {
  const textoBusqueda = buscar.value;
  const eventosFiltrados = filtrarTexto(eventos, textoBusqueda);
  contenedor.innerHTML = ''; // Limpiar el contenedor
  eventosFiltrados.forEach(evento => {
    contenedor.appendChild(cardEvento(evento));
  });
}

buscar.addEventListener("keyup", actualizarEventos);


function filtrado(eventos){
  let primerFiltro = filtrarTexto(eventos)
  let segundoFiltro = actualizarEventos(primerFiltro)
  cardEvento(segundoFiltro)
}




// Crear la funcion de busqueda

// function elBuscador(e) { 
// const busquedaNombreEvento = document.createElement("div");
// busquedaNombreEvento.classList.add("d-inline-flex", "ml-auto", "align-items-center");
// busquedaNombreEvento.innerHTML = `
//   <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" id="busca">
//   <button class="btn btn-outline-success" type="submit">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
//       <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
//     </svg>
//   </button>
// `;

// buscador.appendChild(busquedaNombreEvento);
// }

// buscador.addEventListener('keyup', () => {
//   const filtro = filtroPorTexto();
//   filtrosDeEventos(filtro);
// });

//    const elementoInput = document.querySelector('#formulario');
//    const boton = document.querySelector('#boton');
//     const resultado = document.querySelector('#resultado')
  
//     const filtrar = () => {
//       resultado.innerHTML = ''; // Limpia el contenido anterior
    
//       const texto = elementoInput.value.toLowerCase();
    
//       for (let evento of eventos) {
//         let nombre = evento.name.toLowerCase();
//         if (nombre.includes(texto)) {
//           const cardDiv = document.createElement('div');
//           cardDiv.classList.add('card');
//           cardDiv.innerHTML = `
//             <div class="row">
//               <div class="col-12">
//                 <div class="col-md-2">
//                   <div class="card" style="width: 13rem;">
//                     <img src="${evento.image}" class="img-fluid" alt="...">
//                     <div class="card-body">
//                       <h5 class="card-title">${evento.name}</h5>
//                       <p class="card-text">${evento.description}</p>
//                       <div class="d-flex justify-content-around align-items-center">
//                         <h6 class="card-subtitle mt-2">Price: ${evento.price}</h6>
//                         <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           `;
//           resultado.appendChild(cardDiv); // Agrega el elemento al resultado
//         }
//       }
//     }
    

//   const inputElemento = busquedaForm.querySelectorAll("input");
//   const searchTerm = inputElemento.value.toLowerCase(); // Obtener el término de búsqueda en minúsculas

//   // Filtrar los eventos que coinciden con el término de búsqueda
//   const eventosFiltrados = eventos.filter((evento) => {

//     const titulo = evento.name.split(" ");
//     // Normalizar el nombre del evento: primera palabra en mayúscula, las demás en minúscula
//     const nombreEvento = titulo.map((word, index) => {
//       if (index === 0) {
//         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
//       }
//       return word.toLowerCase();
//     })

//     return nombreEvento.includes(searchTerm);
//   });

//   // Limpia el contenedor antes de mostrar los eventos filtrados
//   contenedor.innerHTML = "";

//   if (eventosFiltrados.length === 0) {
//     // Muestra un mensaje si no hay coincidencias
//     const mensaje = document.createElement("div");
//     mensaje.textContent = "No se encontraron eventos que coincidan con la búsqueda.";
//     contenedor.appendChild(mensaje);
//   } else {
//     // Muestra los eventos filtrados
//     eventosFiltrados.forEach((evento) => {
//       const card = document.createElement("div");
//       card.classList.add("card");
//       card.innerHTML = `<div class="row">
//       <div class="col-12">
// <div class="col-md-2">
// <div class="card" style="width: 13rem;">
//   <img src=${evento.image} class="img-fluid" alt="...">
//   <div class="card-body">
//     <h5 class="card-title">${evento.name}</h5>
//     <p class="card-text">${evento.description}</p>
//     <div class="d-flex justify-content-around align-items-center">
//       <h6 class="card-subtitle mt-2">Price:${evento.price}</h6>
//       <a href="./Details.html?id=${evento._id}" class="btn btn-primary">Details</a>
//     </div>
//   </div>
// </div>
// </div>
// </div>
//       `;

//       contenedor.appendChild(card);
//     });
//   }
// });


// Ahora, agrega el formulario de búsqueda al lugar adecuado en tu interfaz de usuario
// Por ejemplo, podrías usar document.body.appendChild(busquedaForm); para agregarlo al cuerpo del documento.