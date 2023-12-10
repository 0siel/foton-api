import { useState } from "react";
import axios from "axios";

function LoginPage() {
  const [message, setMessage] = useState("Ingresa tu usuario y contraseña"); // [1
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      } else {
        // Handle other errors
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
