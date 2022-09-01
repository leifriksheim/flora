import { Link } from "react-router-dom";

export default function Menu({ onClick = () => {} } = {}) {
  return (
    <ul className="page-menu">
      <li>
        <Link className="page-menu-item" onClick={onClick} to="/project">
          <h2>About</h2>
          <p>Read more about the project</p>
        </Link>
      </li>
      <li>
        <Link className="page-menu-item" onClick={onClick} to="/cameras">
          <h2>Live Camera</h2>
          <p>Watch our live video feed</p>
        </Link>
      </li>
      <li>
        <Link className="page-menu-item" onClick={onClick} to="/radio">
          <h2>Bird Radio</h2>
          <p>Listen to our live audio feed</p>
        </Link>
      </li>
      <li>
        <Link className="page-menu-item" onClick={onClick} to="/observations">
          <h2>Observations</h2>
          <p>See all observations of biodiversity</p>
        </Link>
      </li>
      <li>
        <Link className="page-menu-item" onClick={onClick} to="/traceability">
          <h2> Traceability</h2>
          <p>See where we cut the trees</p>
        </Link>
      </li>
    </ul>
  );
}
