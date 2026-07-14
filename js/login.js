$(document).ready(function() {
  // Animación de entrada de la tarjeta
  $('#tarjeta-login').hide().fadeIn(500);

  // Al hacer clic en ingresar
  $('#btn-login').click(function() {
    let email = $('#email').val();
    let password = $('#password').val();

    // Validación simple: campos obligatorios
    if (email === "" || password === "") {
      alert("Por favor, completa todos los campos.");
    } else {
      alert("¡Bienvenido a Alke Wallet!");
      window.location.href = "menu.html"; // Redirección directa
    }
  });
});