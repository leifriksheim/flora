import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <ul className="page-menu">
      <li>
        <div className="page-menu-item">
          <Link to="/cameras">About</Link>
          <p>Read more about the project</p>
        </div>
      </li>
      <li>
        <div className="page-menu-item">
          <Link to="/cameras">Live Camera</Link>
          <p>Watch our live video feed</p>
        </div>
      </li>
      <li>
        <div className="page-menu-item">
          <Link to="/radio">Bird Radio</Link>
          <p>Listen to our live audio feed</p>
        </div>
      </li>
      <li>
        <div className="page-menu-item">
          <Link to="/observations">Observations</Link>
          <p>See all observations of biodiversity</p>
        </div>
      </li>
      <li>
        <div className="page-menu-item">
          <Link to="/traceability">Traceability</Link>
          <p>See where we cut the trees</p>
        </div>
      </li>
    </ul>
  );
}
