$(document).ready(function() {
  // Animación de entrada de la tarjeta
  $('#tarjeta-login').hide().fadeIn(500);

  // Reemplazo del evento click por submit en el formulario (según consigna)
  $('#loginForm').submit(function(e) {
    e.preventDefault(); // Evita recargar la página

    // Obteniendo valores directamente con selectores jQuery
    let email = $('#email').val().trim();
    let password = $('#password').val().trim();

    // Validación y alertas dinámicas de Bootstrap
    if (email === "" || password === "") {
      // Alerta de error con estilo Bootstrap
      let alertError = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Por favor, completa todos los campos.
        </div>`;
      $('#alert-container').html(alertError);
    } else {
      // Alerta de éxito con estilo Bootstrap
      let alertSuccess = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
          ¡Bienvenido a Alke Wallet! Redirigiendo...
        </div>`;
      $('#alert-container').html(alertSuccess);

      // Redirección requerida por el ejercicio
      setTimeout(function() {
        window.location.href = "menu.html"; // Ajusta a '../HTML/menu.html' si está en otra carpeta
      }, 1500);
    }
  });
});