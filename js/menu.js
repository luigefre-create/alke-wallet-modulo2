$(document).ready(function() {
  // Animación de entrada
  $('#tarjeta-menu').hide().fadeIn(500);

  // Lee el saldo de la memoria. Si no existe, empieza en 0
  let saldo = localStorage.getItem('saldo') || 0;
  
  // Muestra el saldo en el HTML con formato
  $('#saldo').text('$' + parseInt(saldo).toLocaleString());

  // --- Eventos de redirección según consigna ---

  // Redirección a Depósito
  $('#btnDepositar').click(function() {
    $('#leyendaRedireccion').text("Redirigiendo a depósito...");
    setTimeout(function() {
      window.location.href = 'deposit.html';
    }, 1000);
  });

  // Redirección a Transferir / Enviar dinero
  $('#btnEnviar').click(function() {
    $('#leyendaRedireccion').text("Redirigiendo a enviar dinero...");
    setTimeout(function() {
      window.location.href = 'sendmoney.html';
    }, 1000);
  });

  // Redirección a Últimos Movimientos
  $('#btnMovimientos').click(function() {
    $('#leyendaRedireccion').text("Redirigiendo a últimos movimientos...");
    setTimeout(function() {
      window.location.href = 'transactions.html';
    }, 1000);
  });
});