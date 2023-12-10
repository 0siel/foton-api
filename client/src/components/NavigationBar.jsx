import { Link } from "react-router-dom";

export function Navigation() {
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
      </ul>
    </nav>
  );
}
