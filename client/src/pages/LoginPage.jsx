import { useState } from "react";
import axios from "axios";

// Creacion de la pagina de login
//

function LoginPage() {
  const [message, setMessage] = useState("Ingresa tu usuario y contraseña"); // Mensaje mostrado al usuario
  const [email, setEmail] = useState(""); //Campo email
  const [password, setPassword] = useState(""); //Campo password
  const [loginError, setLoginError] = useState(false); // Indica si ocurrió un error al hacer login, para mostrar el mensaje de error en color rojo

  // Función que se ejecuta cuando se hace submit en el formulario
  const handleSubmit = async (event) => {
    event.preventDefault(); //Evita que se recargue la pagina
    setLoginError(false); //Cambia el estado de loginError a false para indicar que no hay errores
    setMessage("Iniciando sesión..."); //Cambia el mensaje mostrado al usuario

    // Hacer petición a la API para hacer el login del usuario
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        //Se incluyen los datos del usuario en el body de la peticion
        {
          email: email,
          password: password,
        }
      );

      //En caso de que la peticion sea exitosa, se muestra un mensaje de exito y se redirige al usuario a la pagina de posts
      if (response.status === 200) {
        console.log(response.data);
        alert("Login successful");
        // Guarda el token y el id del usuario en el local storage enviados por la API
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);

        // Redirect to posts page
        window.location.href = "/foton/posts";
      }

      //console.log(response.data);
    } catch (error) {
      // En caso de que la peticion falle, se muestra un mensaje de error al usuario indicando el error y se imprime el error en la consola
      if (error.response && error.response.status === 401) {
        // Handle 401 error here
        setMessage("Usuario o contraseña incorrectos");
        setLoginError(true);
      } else {
        // Manejo de otros errores de servidor
        console.error(error);
      }
    }
  };

  // Creacion de la pagina de login
  // Descripcion: Esta pagina permite al usuario iniciar sesion en la aplicacion para poder acceder a las funcionalidades de la misma, consta de un formulario con los campos de email y password, un boton para hacer submit del formulario y un link para redirigir al usuario a la pagina de registro en caso de que no tenga una cuenta
  return (
    <div className="login-page">
      <div className="content">
        <div className="login-logo">
          <img src="\src\assets\foton-logorbg.png" alt="logo" />
        </div>
        <h1>Inicia sesión</h1>
        <p>
          {loginError ? (
            <div className="error-message">{message}</div>
          ) : (
            message
          )}
        </p>
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
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit">Iniciar sesión</button>
        </form>
        <div className="sign-up-link">
          <a href="/foton/signup">¿No tienes cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; // Exporta la pagina de login
