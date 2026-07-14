$(document).ready(function() {
  $('#tarjeta-deposito').hide().fadeIn(500);

  // Cargar saldo actual en pantalla
  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  $('#btn-depositar').click(function() {
    let monto = parseInt($('#monto-deposito').val());

    if (monto > 0) {
      saldo = saldo + monto; // Suma básica
      
      // Guardamos el nuevo saldo y el texto de la transacción por separado
      localStorage.setItem('saldo', saldo);
      localStorage.setItem('ultimo_movimiento', 'Depósito reciente: +$' + monto.toLocaleString());

      // Actualizamos la pantalla y limpiamos el input
      $('#saldo-actual').text('$' + saldo.toLocaleString());
      $('#monto-deposito').val('');
      alert('¡Depósito exitoso!');
    } else {
      alert('Por favor, ingresa un monto válido.');
    }
  });
});