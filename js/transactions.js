$(document).ready(function() {
  $('#tarjeta-movimientos').hide().fadeIn(500);

  // Mostrar el saldo disponible
  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  // Función para renderizar los movimientos
  function mostrarUltimosMovimientos(filtro) {
    let $lista = $('#lista-transacciones');
    $lista.empty();

    // Recuperar historial
    let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];

    // Filtrar por tipo
    let filtrados = filtro === 'todos' 
      ? historial 
      : historial.filter(m => m.tipo === filtro);

    if (filtrados.length === 0) {
      $lista.append('<li class="list-group-item text-muted text-center" id="sin-movimientos">Aún no registras movimientos en esta categoría.</li>');
    } else {
      filtrados.forEach(function(m) {
        let claseBadge = m.tipo === 'deposito' ? 'badge-success' : 'badge-warning';
        let textoTipo = m.tipo === 'deposito' ? 'Depósito' : 'Transferencia';
        
        $lista.append(`
          <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${m.detalle}</span>
            <span class="badge ${claseBadge} badge-pill">${textoTipo}</span>
          </li>
        `);
      });
    }
  }

  // Escuchar el selector de filtro
  $('#selectFiltro').change(function() {
    let filtroSeleccionado = $(this).val();
    mostrarUltimosMovimientos(filtroSeleccionado);
  });

  // Cargar por primera vez
  mostrarUltimosMovimientos('todos');

  // Botón para limpiar historial de pruebas
  $('#btn-limpiar').click(function() {
    localStorage.removeItem('historial_movimientos');
    mostrarUltimosMovimientos('todos');

    let alertHtml = `
      <div class="alert alert-info alert-dismissible fade show" role="alert">
        Historial de transacciones limpiado.
      </div>`;
    $('#alert-container').html(alertHtml);
  });
});