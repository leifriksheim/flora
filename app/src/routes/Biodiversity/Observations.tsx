import { useEffect, useState, useRef } from "react";
import "./index.css";

type Observation = {
  name: String;
};

async function getIdentifiers() {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations/identifiers?verifiable=true&spam=false&nelat=41.451898597071555&nelng=2.1406042373937506&swlat=41.4474756825558&swlng=2.1290278232854742&locale=nb`
  );

  return res.json();
}

async function getObservations({ page = 1 }) {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?verifiable=true&order_by=observations.id&order=desc&page=${page}&spam=false&nelat=41.451890555682404&nelng=2.1406096018117804&swlat=41.44746764061841&swlng=2.1290224588674445&locale=nb&per_page=24`
  );

  return res.json();
}

async function getSpecies() {
  const res = await fetch(
    "https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&spam=false&nelat=41.451890555682404&nelng=2.1406096018117804&swlat=41.44746764061841&swlng=2.1290224588674445&locale=nb&per_page=50"
  );
  return res.json();
}

export default function Observations() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [observationCount, setObservationCount] = useState(0);
  const [identifierCount, setIdentifierCount] = useState(0);
  const [observations, setObservations] = useState<Observation[]>([]);
  const [speciesCount, setSpeciesCount] = useState<number[]>([]);
  const [species, setSpecies] = useState([]);

  async function fetchData() {
    const { results: observations, total_results: observationCount } =
      await getObservations({
        page,
      });
    setObservationCount(observationCount);
    setObservations(observations);

    const { total_results: identifierCount } = await getIdentifiers();
    setIdentifierCount(identifierCount);

    const { results: species, total_results: speciesCount } =
      await getSpecies();
    setSpecies(species);
    setSpeciesCount(speciesCount);
  }

  async function loadMore() {
    setLoading(true);
    const { results } = await getObservations({ page: page + 1 });
    setObservations([...observations, ...results]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="observations">
      <div className="container">
        <div className="info-grid">
          <div className="info">
            <h2 className="info__number">{observationCount}</h2>
            <small className="info__desc">Observations</small>
          </div>
          <div className="info">
            <h2 className="info__number">{speciesCount}</h2>
            <small className="info__desc">Species</small>
          </div>
          <div className="info">
            <h2 className="info__number">{identifierCount}</h2>
            <small className="info__desc">Identifiers</small>
          </div>
        </div>

        <div className="grid">
          {species.map(({ taxon, count }: any) => {
            return (
              <a
                key={taxon.id}
                href={`https://www.inaturalist.org/taxa/${taxon.id}`}
                target="_blank"
              >
                <article className="observation">
                  <div className="observation__photo-container">
                    <img
                      loading="lazy"
                      className="observation__photo"
                      src={taxon.default_photo.medium_url}
                    ></img>
                    <div className="observation__count">
                      {count} observations
                    </div>
                  </div>

                  <div className="observation__info">
                    <div className="observation__taxon">
                      {taxon.iconic_taxon_name}
                    </div>
                    <h2 className="observation__title">
                      {taxon?.english_common_name || taxon?.name || "Unkown"}
                    </h2>
                  </div>
                </article>
              </a>
            );
          })}
        </div>
        <button className="load-more" onClick={loadMore}>
          {loading ? "Loading" : "Load more"}
        </button>
      </div>
    </main>
  );
}
