$(document).ready(function() {
  $('#tarjeta-transferir').hide().fadeIn(500);

  let saldo = parseInt(localStorage.getItem('saldo')) || 0;
  $('#saldo-actual').text('$' + saldo.toLocaleString());

  $('#btn-toggle-contacto').click(function() {
    $('#form-nuevo-contacto').slideToggle(300);
  });

  $('#sendMoneyForm').submit(function(e) {
    e.preventDefault();

    let contacto = $('#buscar-contacto').val().trim();
    let monto = parseInt($('#monto-transferir').val());

    if (contacto === "") {
      mostrarAlerta("Por favor, selecciona o escribe el nombre del contacto.", "danger");
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      mostrarAlerta("Por favor, ingresa un monto válido.", "danger");
      return;
    }

    if (monto > saldo) {
      mostrarAlerta("No tienes saldo suficiente para transferir esa cantidad.", "warning");
      return;
    }

    saldo = saldo - monto;
    localStorage.setItem('saldo', saldo);

    // --- REGISTRO EN EL HISTORIAL COMPLETO ---
    let historial = JSON.parse(localStorage.getItem('historial_movimientos')) || [];
    historial.push({
      tipo: 'transferencia',
      detalle: 'Transferencia a ' + contacto + ': -$' + monto.toLocaleString()
    });
    localStorage.setItem('historial_movimientos', JSON.stringify(historial));
    // ----------------------------------------

    $('#saldo-actual').text('$' + saldo.toLocaleString());
    $('#buscar-contacto').val('');
    $('#monto-transferir').val('');

    mostrarAlerta('¡Transferencia a ' + contacto + ' realizada con éxito!', "success");

    setTimeout(function() {
      window.location.href = 'menu.html';
    }, 2000);
  });

  $('#form-nuevo-contacto').submit(function(e) {
    e.preventDefault();

    let nuevoNombre = $('#nuevo-contacto-nombre').val().trim();
    let nuevoCbu = $('#nuevo-contacto-cbu').val().trim();

    if (nuevoCbu !== "" && nuevoCbu.length < 10) {
      mostrarAlerta("El CBU/Alias debe tener un formato válido.", "warning");
      return;
    }

    if (nuevoNombre !== "") {
      $('#contactos-sugeridos').append('<option value="' + nuevoNombre + '">');
      $('#buscar-contacto').val(nuevoNombre).addClass('border-success');
      $('#form-nuevo-contacto').slideUp(300);
      $('#nuevo-contacto-nombre').val('');
      $('#nuevo-contacto-cbu').val('');

      mostrarAlerta('Contacto "' + nuevoNombre + '" agregado exitosamente.', "info");
    }
  });

  function mostrarAlerta(mensaje, tipo) {
    let alertaHtml = `
      <div class="alert alert-${tipo} alert-dismissible fade show" role="alert">
        ${mensaje}
      </div>`;
    $('#alert-container').html(alertaHtml);
  }
});