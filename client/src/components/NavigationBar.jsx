import { Link } from "react-router-dom";

export function Navigation() {
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  };

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
          <a href="/foton/login" onClick={logout}>
            <Link to="/foton/login">
              <div className="home-icon">
                <img src="\src\assets\logout.png" alt="icon img" />
              </div>
              <p>Cerrar sesión</p>
            </Link>
          </a>
        </li>
      </ul>
    </nav>
  );
}
