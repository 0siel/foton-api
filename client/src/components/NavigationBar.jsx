//Descripcion del componente:
//Componente que renderiza la barra de navegacion de la aplicacion, incluye los links a las diferentes paginas de la aplicacion

import { Link } from "react-router-dom";

export function Navigation() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  };

  //Renderiza la barra de navegacion incluyendo los links a las diferentes paginas de la aplicacion: Inicio, Fotos del día, Crear y Cerrar sesión
  return (
    <nav className="NavBar">
      <ul>
        <li className="NavigationItem">
          <Link to="/foton/posts">
            <div className="home-icon">
              <img src="\src\assets\home.png" alt="icon img" />
            </div>
            <p>Inicio</p>
          </Link>
        </li>

        <li className="NavigationItem">
          <Link to="/foton/fotos-del-dia">
            <div className="home-icon">
              <img src="\src\assets\gallery-icon.png" alt="icon img" />
            </div>
            <p>Fotos del día</p>
          </Link>
        </li>

        <li className="NavigationItem">
          <Link to="/foton/create">
            <div className="home-icon">
              <img src="\src\assets\create-camera.png" alt="icon img" />
            </div>
            <p>Crear</p>
          </Link>
        </li>
        {/*
        Logout button
        */}
        <li className="NavigationItem">
          <Link to="/foton/login" onClick={logout}>
            <div className="home-icon">
              <img src="\src\assets\logout.png" alt="icon img" />
            </div>
            <p>Cerrar sesión</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
