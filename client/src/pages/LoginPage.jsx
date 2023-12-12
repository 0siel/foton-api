import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [message, setMessage] = useState("Ingresa tu usuario y contraseña"); // [1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false); // 2

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(false);
    setMessage("Iniciando sesión...");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login/",
        {
          email: email,
          password: password,
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        alert("Login successful");
        // Store the token into the local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);

        // Redirect to posts page
        window.location.href = "/foton/posts";
      }

      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle 401 error here
        setMessage("Usuario o contraseña incorrectos");
        setLoginError(true);
      } else {
        // Handle other errors
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

          <button type="submit">Login</button>
        </form>
        <div className="sign-up-link">
          <a href="/foton/signup">¿No tienes cuenta? Regístrate</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
