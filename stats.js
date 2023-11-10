const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Verificar que data y data.events existan
    if (data && data.events) {
      // Obtener la lista de eventos desde la API
      const eventos = data.events;

      // Obtener categorías únicas
      const categoriasUnicas = [...new Set(eventos.map(evento => evento.category))];

      // Crear la tabla y llenarla con la información (tabla de asistencia)
      const tableAsistencia = document.createElement("table");
      tableAsistencia.innerHTML = `
        <tr>
          <th>Categories</th>
          <th>Revenues</th>
          <th>Percentage of attendance</th>
        </tr>
        ${categoriasUnicas.map(categoria => {
          // Filtrar eventos de la categoría actual
          const eventosCategoria = eventos.filter(evento => evento.category === categoria);

          // Calcular las ganancias totales
          const ingresosTotales = eventosCategoria.reduce((total, evento) => {
            return total + (evento.assistance ? evento.assistance * evento.price : 0);
          }, 0);

          // Filtrar eventos con asistencia mayor al 100% de la capacidad
          const eventosConAsistencia = eventosCategoria.filter(evento => evento.assistance && evento.assistance > evento.capacity);

          // Calcular el porcentaje de asistencia
          const porcentajeAsistencia = ((eventosConAsistencia.length / eventosCategoria.length) * 100).toFixed(2);

          return `
            <tr>
              <td>${categoria}</td>
              <td>${ingresosTotales ? `$${ingresosTotales.toFixed(2)}` : 'N/A'}</td>
              <td>${porcentajeAsistencia}%</td>
            </tr>`;
        }).join('')}
      `;

      // Obtener el contenedor en el que deseas agregar la tabla de asistencia
      const contenedorAsistencia = document.getElementById("contenido1");

      // Agregar la tabla de asistencia al contenedor
      contenedorAsistencia.appendChild(tableAsistencia);

      // Crear la tabla y llenarla con la información (tabla de estimate)
      const tableEstimate = document.createElement("table");
      tableEstimate.innerHTML = `
        <tr>
          <th>Categories</th>
          <th>Estimated Revenues</th>
          <th>Percentage of estimate</th>
        </tr>
        ${categoriasUnicas.map(categoria => {
          // Filtrar eventos de la categoría actual con estimate
          const eventosCategoriaEstimate = eventos.filter(evento => evento.category === categoria && evento.estimate !== undefined);

          // Calcular las ganancias totales estimadas
          const ingresosTotalesEstimados = eventosCategoriaEstimate.reduce((total, evento) => {
            return total + (evento.estimate ? evento.estimate * evento.price : 0);
          }, 0);

          // Calcular el porcentaje de asistencia estimado
          const porcentajeEstimado = ((ingresosTotalesEstimados / eventosCategoriaEstimate.reduce((total, evento) => total + evento.capacity, 0)) * 100).toFixed(2);

          return `
            <tr>
              <td>${categoria}</td>
              <td>${ingresosTotalesEstimados ? `$${ingresosTotalesEstimados.toFixed(2)}` : 'N/A'}</td>
              <td>${porcentajeEstimado}%</td>
            </tr>`;
        }).join('')}
      `;

      // Obtener el contenedor en el que deseas agregar la tabla de estimate
      const contenedorEstimate = document.getElementById("contenido2");

      // Agregar la tabla de estimate al contenedor
      contenedorEstimate.appendChild(tableEstimate);

      // Obtener el evento con la mayor asistencia
      const eventoMayorAsistencia = eventos.reduce((mayorAsistencia, evento) => {
        return evento.assistance > mayorAsistencia.assistance ? evento : mayorAsistencia;
      }, eventos[0]);

      // Obtener el evento con la menor asistencia (ignorando aquellos con asistencia igual a 0)
      const eventosConAsistencia = eventos.filter(evento => evento.assistance > 0);
      const eventoMenorAsistencia = eventosConAsistencia.reduce((menorAsistencia, evento) => {
        return evento.assistance < menorAsistencia.assistance ? evento : menorAsistencia;
      }, eventosConAsistencia[0]);

      // Obtener el evento con la mayor capacidad
      const eventoMayorCapacidad = eventos.reduce((mayorCapacidad, evento) => {
        return evento.capacity > mayorCapacidad.capacity ? evento : mayorCapacidad;
      }, eventos[0]);

      // Crear la tabla y llenarla con la información (tabla de eventos)
      const tableEventos = document.createElement("table");
      tableEventos.innerHTML = `
        <tr>
          <th>Event with highest assistance</th>
          <th>Event with lowest attendance</th>
          <th>Event with larger capacity</th>
        </tr>
        <tr>
          <td>${eventoMayorAsistencia.name}</td>
          <td>${eventoMenorAsistencia.name}</td>
          <td>${eventoMayorCapacidad.name}</td>
        </tr>
      `;

      // Obtener el contenedor en el que deseas agregar la tabla de eventos
      const contenedorEventos = document.getElementById("contenido3");

      // Agregar la tabla de eventos al contenedor
      contenedorEventos.appendChild(tableEventos);
    } else {
      console.error('Los datos de la categoría no están presentes en la respuesta de la API.');
    }
  })
  .catch(error => {
    console.error('Error al cargar datos desde la API:', error);
  });
