import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <nav>
      <ul>
        <li className="NavigatioItem">
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/fotos-del-dia">Fotos del día</Link>
        </li>
      </ul>
    </nav>
  );
}
