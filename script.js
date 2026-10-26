
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("formRegistro");
  const nombre= document.getElementById("nombre");
  const ci= document.getElementById("CI");
  const pass1= document.getElementById("pass1");
  const pass2= document.getElementById("pass2");

  const errorNombre= document.getElementById("errorNombre");
  const errorCI= document.getElementById("errorCI");
  const errorPass1= document.getElementById("errorPass1");
  const errorPass2= document.getElementById("errorPass2");

  function setError(span, mensaje) {
    if (mensaje) {
      span.textContent = mensaje;
      span.style.color = "red";
      span.style.display = "block";
    } else {
      span.textContent = "";
      span.style.display = "none";
    }
  }

  function validarNombre() {
    const valor = nombre.value.trim();
    if (valor === "") {
      setError(errorNombre, "El nombre no puede estar vacío.");
      return false;
    }
    setError(errorNombre, "");
    return true;
  }

  function validarCI() {
    const valor = ci.value.trim();

    if (valor === "") {
      setError(errorCI, "El CI no puede estar vacío.");
      return false;
    }

    if (valor.length < 11) {
      setError(errorCI, "El CI debe tener al menos 11 caracteres.");
      return false;
    }

    if (!/^\d+$/.test(valor)) {
      setError(errorCI, "El CI solo puede contener números.");
      return false;
    }
    setError(errorCI, "");
    return true;
  }

  function validarPass1() {
    const valor = pass1.value;

    if (valor === "") {
      setError(errorPass1, "La contraseña no puede estar vacía.");
      return false;
    }

    setError(errorPass1, "");

    if (pass2.value !== "") validarPass2();
    return true;
  }

  function validarPass2() {
    const valor1 = pass1.value;
    const valor2 = pass2.value;

    if (valor2 === "") {
      setError(errorPass2, "Debes confirmar la contraseña.");
      return false;
    }

    if (valor1 !== valor2) {
      setError(errorPass2, "Las contraseñas no coinciden.");
      return false;
    }

    setError(errorPass2, "");
    return true;
  }

  nombre.addEventListener("input", validarNombre);
  ci.addEventListener("input", validarCI);
  pass1.addEventListener("input", validarPass1);
  pass2.addEventListener("input", validarPass2);

  nombre.addEventListener("blur", validarNombre);
  ci.addEventListener("blur", validarCI);
  pass1.addEventListener("blur", validarPass1);
  pass2.addEventListener("blur", validarPass2);

  form.addEventListener("submit", (evento) => {

    const vNombre = validarNombre();
    const vCI     = validarCI();
    const vPass1  = validarPass1();
    const vPass2  = validarPass2();

    if (!(vNombre && vCI && vPass1 && vPass2)) {
      evento.preventDefault();         
      if (!vNombre) nombre.focus();
      else if (!vCI) ci.focus();
      else if (!vPass1) pass1.focus();
      else if (!vPass2) pass2.focus();
      return;
    }

  });

  form.addEventListener("reset", () => {
    [errorNombre, errorCI, errorPass1, errorPass2].forEach(span => {
      span.textContent = "";
      span.style.display = "none";
    });
  });

});