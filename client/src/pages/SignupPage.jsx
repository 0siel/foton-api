import { useState } from "react";
import axios from "axios";

function SignupPage() {
  const [message, setMessage] = useState("Ingresa tu información"); // [1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false); // 2

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(false);
    setMessage("Iniciando sesión...");

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setLoginError(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup/",
        {
          email: email,
          username: username,
          password: password,
        }
      );
      if (response.status === 201) {
        console.log(response.data);
        alert("Cuenta creada exitosamente");

        // Redirect to login page
        console.log(response.data);
        window.location.href = "/foton/login";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 401 error here
        let errorMsg =
          error.response.data.email?.join(", ") ||
          error.response.data.username?.join(", ") ||
          error.response.data.password?.join(", ") ||
          "Error desconocido";
        setMessage(errorMsg);
        setLoginError(true);
      } else {
        // Handle other errors
        setMessage("Error desconocido");
        console.error(error);
      }
    }
  };

  return (
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

          <button type="submit">Login</button>
        </form>
        <div className="sign-up-link">
          <a href="/foton/login">¿Ya tienes una cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export { SignupPage };
