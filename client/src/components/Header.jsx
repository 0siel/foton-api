import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img
          className="logo"
          src="\src\assets\foton-logo.jpeg"
          alt="Foton logo"
        />
        <h1>
          <Link to="/foton/posts" className="header-link">
            Foton: La foto del día
          </Link>
        </h1>
      </div>
    </header>
  );
}
