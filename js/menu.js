$(document).ready(function() {
  $('#tarjeta-menu').hide().fadeIn(500);

  // Lee el saldo de la memoria. Si no existe, empieza en 0
  let saldo = localStorage.getItem('saldo') || 0;
  
  // Muestra el saldo en el HTML
  $('#saldo').text('$' + parseInt(saldo).toLocaleString());
});