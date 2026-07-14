$(document).ready(function() {
  $('#tarjeta-transferir').hide().fadeIn(500);

  // Cargar saldo actual en pantalla
  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  // Botón para transferir
  $('#btn-transferir').click(function() {
    let contacto = $('#buscar-contacto').val();
    let monto = parseInt($('#monto-transferir').val());

    if (contacto === "") {
      alert("Por favor, escribe el nombre del contacto.");
      return;
    }
    if (monto <= 0 || isNaN(monto)) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }
    if (monto > saldo) {
      alert("No tienes saldo suficiente para transferir esa cantidad.");
      return;
    }

    // Restamos el dinero del saldo
    saldo = saldo - monto;
    
    // Guardamos los datos simples en la memoria
    localStorage.setItem('saldo', saldo);
    localStorage.setItem('ultimo_movimiento', 'Transferencia a ' + contacto + ': -$' + monto.toLocaleString());

    // Actualizamos la interfaz
    $('#saldo-actual').text('$' + saldo.toLocaleString());
    $('#buscar-contacto').val('');
    $('#monto-transferir').val('');
    alert('¡Transferencia realizada con éxito!');
  });

  // Botón para agregar contactos a la lista sugerida del HTML
  $('#btn-agregar-contacto').click(function() {
    let nuevoNombre = $('#nuevo-contacto-nombre').val();

    if (nuevoNombre !== "") {
      // Agrega la etiqueta option directamente al datalist usando jQuery
      $('#contactos-sugeridos').append('<option value="' + nuevoNombre + '">');
      $('#nuevo-contacto-nombre').val('');
      alert('Contacto agregado a las sugerencias.');
    } else {
      alert('Por favor, escribe un nombre.');
    }
  });
});