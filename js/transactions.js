$(document).ready(function() {
  $('#tarjeta-movimientos').hide().fadeIn(500);

  // Mostrar el saldo disponible
  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  // Leemos el texto del último movimiento guardado
  let ultimoMovimiento = localStorage.getItem('ultimo_movimiento');

  // Si existe algún movimiento en la memoria, lo mostramos en la lista
  if (ultimoMovimiento !== null) {
    $('#sin-movimientos').remove(); // Quitamos el mensaje de "no hay movimientos"
    $('#lista-transacciones').append('<li class="list-group-item">' + ultimoMovimiento + '</li>');
  }

  // Botón para limpiar la pantalla de pruebas
  $('#btn-limpiar').click(function() {
    localStorage.removeItem('ultimo_movimiento');
    $('#lista-transacciones').html('<li class="list-group-item text-muted text-center" id="sin-movimientos">Aún no registras movimientos.</li>');
    alert('Historial limpio.');
  });
});