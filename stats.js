const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    if (data && data.events) {
      const eventos = data.events;

      const categoriasUnicas = [...new Set(eventos.map(evento => evento.category))];

      const tableAsistencia = document.createElement("table");
      tableAsistencia.innerHTML = `
        <tr>
          <th>Categories</th>
          <th>Revenues</th>
          <th>Percentage of attendance</th>
        </tr>
        ${categoriasUnicas.map(categoria => {
          const eventosCategoria = eventos.filter(evento => evento.category === categoria);

          const ingresosTotales = eventosCategoria.reduce((total, evento) => {
            return total + (evento.assistance ? evento.assistance * evento.price : 0);
          }, 0);

          const eventosConAsistenciaValida = eventosCategoria.filter(evento => evento.assistance && evento.assistance > 0);

          const porcentajeAsistencia = eventosConAsistenciaValida.length > 0
            ? ((eventosConAsistenciaValida.length / eventosCategoria.length) * 100).toFixed(2)
            : 'N/A';

          return `
            <tr>
              <td>${categoria}</td>
              <td>${ingresosTotales ? `$${ingresosTotales.toFixed(2)}` : 'N/A'}</td>
              <td>${porcentajeAsistencia}%</td>
            </tr>`;
        }).join('')}
      `;

      const contenedorAsistencia = document.getElementById("contenido1");

      contenedorAsistencia.appendChild(tableAsistencia);

      const tableEstimate = document.createElement("table");
      tableEstimate.innerHTML = `
        <tr>
          <th>Categories</th>
          <th>Estimated Revenues</th>
          <th>Percentage of estimate</th>
        </tr>
        ${categoriasUnicas.map(categoria => {
          const eventosCategoriaEstimate = eventos.filter(evento => evento.category === categoria && evento.estimate !== undefined);

          const ingresosTotalesEstimados = eventosCategoriaEstimate.reduce((total, evento) => {
            return total + (evento.estimate ? evento.estimate * evento.price : 0);
          }, 0);

          const porcentajeEstimado = ((ingresosTotalesEstimados / eventosCategoriaEstimate.reduce((total, evento) => total + evento.capacity, 0)) * 100).toFixed(2);

          return `
            <tr>
              <td>${categoria}</td>
              <td>${ingresosTotalesEstimados ? `$${ingresosTotalesEstimados.toFixed(2)}` : 'N/A'}</td>
              <td>${porcentajeEstimado}%</td>
            </tr>`;
        }).join('')}
      `;

      const contenedorEstimate = document.getElementById("contenido2");

      contenedorEstimate.appendChild(tableEstimate);

      const eventoMayorAsistencia = eventos.reduce((mayorAsistencia, evento) => {
        return evento.assistance > mayorAsistencia.assistance ? evento : mayorAsistencia;
      }, eventos[0]);

      const eventosConAsistencia = eventos.filter(evento => evento.assistance > 0);
      const eventoMenorAsistencia = eventosConAsistencia.reduce((menorAsistencia, evento) => {
        return evento.assistance < menorAsistencia.assistance ? evento : menorAsistencia;
      }, eventosConAsistencia[0]);

      const eventoMayorCapacidad = eventos.reduce((mayorCapacidad, evento) => {
        return evento.capacity > mayorCapacidad.capacity ? evento : mayorCapacidad;
      }, eventos[0]);

      const tableEventos = document.createElement("table");
      tableEventos.innerHTML = `
        <tr>
          <th>Event with highest attendance</th>
          <th>Event with lowest attendance</th>
          <th>Event with larger capacity</th>
        </tr>
        <tr>
          <td>${eventoMayorAsistencia.name}</td>
          <td>${eventoMenorAsistencia.name}</td>
          <td>${eventoMayorCapacidad.name}</td>
        </tr>
      `;

      const contenedorEventos = document.getElementById("contenido3");

      contenedorEventos.appendChild(tableEventos);
    } else {
      console.error('Los datos de la categoría no están presentes en la respuesta de la API.');
    }
  })
  .catch(error => {
    console.error('Error al cargar datos desde la API:', error);
  });
