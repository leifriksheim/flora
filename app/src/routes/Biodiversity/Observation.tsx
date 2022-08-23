import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";

const nelat = "41.452398072632";

async function getTaxa(id: string | undefined) {
  const res = await fetch(`https://api.inaturalist.org/v1/taxa/${id}`);
  return res.json();
}

export default function Observations() {
  let { id } = useParams();

  const [observation, setObservation] = useState<any>("");

  async function fetchData() {
    const taxa = await getTaxa(id);
    setObservation(taxa.results[0]);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (!observation) return null;

  return (
    <main className="observation">
      <div className="container">
        <div className="article">
          <p style={{ marginBottom: "50px" }}>
            <Link to="/observations">&#8592; All observations</Link>
          </p>
          <img
            loading="lazy"
            className="main-image"
            src={observation.default_photo.medium_url}
          ></img>
          <h1 className="main-heading">{observation.preferred_common_name}</h1>
          <p
            className="subtitle"
            dangerouslySetInnerHTML={{ __html: observation.wikipedia_summary }}
          ></p>
          <div style={{ textAlign: "center" }}>
            <a
              href={`https://www.inaturalist.org/taxa/${id}`}
              className="button"
            >
              Read more on iNaturalist
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
