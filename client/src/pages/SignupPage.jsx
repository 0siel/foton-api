import { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [message, setMessage] = useState("Ingresa tu información"); // Mensaje mostrado al usuario
  const [email, setEmail] = useState(""); //Campo email
  const [password, setPassword] = useState(""); //Campo password
  const [confirmPassword, setConfirmPassword] = useState(""); //Campo confirmar password
  const [username, setUsername] = useState(""); //Campo username
  const [loginError, setLoginError] = useState(false); // Indica si ocurrió un error al hacer signup, para mostrar el mensaje de error en color rojo

  // Función que se ejecuta cuando se hace submit en el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); //Evita que se recargue la pagina
    setLoginError(false); //Cambia el estado de loginError a false para indicar que no hay errores
    setMessage("Iniciando sesión..."); //Cambia el mensaje mostrado al usuario

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setLoginError(true);
      return; //Termina la ejecucion de la funcion
    }

    // Hacer petición a la API para hacer el registro del usuario
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup/",
        {
          //Se incluyen los datos del usuario en el body de la peticion
          email: email,
          username: username,
          password: password,
        }
      );
      //En caso de que la peticion sea exitosa, se muestra un mensaje de exito y se redirige al usuario a la pagina de login
      if (response.status === 201) {
        console.log(response.data);
        alert("Cuenta creada exitosamente");

        // Redirect to login page
        console.log(response.data);
        window.location.href = "/foton/login";
      }
    } catch (error) {
      // En caso de que la peticion falle, se muestra un mensaje de error al usuario indicando el error y se imprime el error en la consola
      if (error.response && error.response.status === 400) {
        // Manejo de errores de validación
        let errorMsg =
          error.response.data.email?.join(", ") ||
          error.response.data.username?.join(", ") ||
          error.response.data.password?.join(", ") ||
          "Error desconocido";
        setMessage(errorMsg);
        setLoginError(true);
      } else {
        // Manejo de otros errores de servidor
        setMessage("Error desconocido");
        console.error(error);
      }
    }
  };

  return (
    // Formulario de login con los campos de email, username y password
    // Al hacer submit se ejecuta la funcion handleSubmit
    // Al hacer click en el link de "¿Ya tienes una cuenta? Inicia sesión" se redirige al usuario a la pagina de login
    <div className="login-page">
      <div className="content">
        <div className="login-logo">
          <img src="\src\assets\foton-logorbg.png" alt="logo" />
        </div>
        <h1>Crea un cuenta</h1>
        <div>
          {loginError ? (
            <div className="error-message">{message}</div>
          ) : (
            message
          )}
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Correo:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Nombre de usuario:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <label>
            Confirmar Contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Registrarme</button>
        </form>
        <div className="sign-up-link">
          <a href="/foton/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
// Este componente se exporta para poder ser usado en el archivo foton-api/client/src/App.js
export { SignupPage };
