import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="Header">
      <h1>
        <Link to="/foton/posts">Foton: La foto del día</Link>
      </h1>
      <img src="/logo192.png" alt="Foton logo" />
    </header>
  );
}
