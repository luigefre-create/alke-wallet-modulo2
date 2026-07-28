$(document).ready(function() {
  $('#tarjeta-deposito').hide().fadeIn(500);

  // Cargar saldo actual
  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  $('#depositForm').submit(function(e) {
    e.preventDefault();

    let monto = parseInt($('#monto-deposito').val());

    if (monto > 0) {
      saldo = saldo + monto;
      localStorage.setItem('saldo', saldo);

      // --- REGISTRO EN EL HISTORIAL COMPLETO ---
      let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
      historial.push({
        tipo: 'deposito',
        detalle: 'Depósito de fondos: +$' + monto.toLocaleString()
      });
      localStorage.setItem('historial_movimientos', JSON.stringify(historial));
      // ----------------------------------------

      $('#saldo-actual').text('$' + saldo.toLocaleString());
      $('#leyendaMonto').text('Monto depositado: $' + monto.toLocaleString());

      let alertSuccess = `
        <div class="alert alert-success fade show" role="alert">
          ¡Depósito realizado con éxito! Redirigiendo al menú...
        </div>`;
      $('#alert-container').html(alertSuccess);

      $('#monto-deposito').val('');
      $('#btn-depositar').prop('disabled', true);

      setTimeout(function() {
        window.location.href = 'menu.html';
      }, 2000);

    } else {
      let alertError = `
        <div class="alert alert-danger fade show" role="alert">
          Por favor, ingresa un monto válido mayor a 0.
        </div>`;
      $('#alert-container').html(alertError);
    }
  });
});