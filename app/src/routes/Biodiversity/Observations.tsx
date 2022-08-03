import { useEffect, useState, useRef } from "react";
import "./index.css";

const nelat = "41.452398072632";

async function getIdentifiers({ taxa = "" }) {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations/identifiers?verifiable=true&iconic_taxa=${taxa}&spam=false&nelat=41.451898597071555&nelng=2.1406042373937506&swlat=41.4474756825558&swlng=2.1290278232854742&locale=nb`
  );

  return res.json();
}

async function getObservations({ page = 1, taxa = "" }) {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations?verifiable=true&iconic_taxa=${taxa}&order_by=observations.id&order=desc&page=${page}&spam=false&nelat=41.451890555682404&nelng=2.1406096018117804&swlat=41.44746764061841&swlng=2.1290224588674445&locale=nb&per_page=24`
  );

  return res.json();
}

async function getSpecies({ page = 1, taxa = "" }) {
  const res = await fetch(
    `https://api.inaturalist.org/v1/observations/species_counts?verifiable=true&page=${page}&iconic_taxa=${taxa}&spam=false&&nelat=41.451890555682404&nelng=2.1406096018117804&swlat=41.44746764061841&swlng=2.1290224588674445&locale=nb&per_page=50`
  );
  return res.json();
}

const taxaOptions = [
  { value: "", label: "All" },
  { value: "Fungi", label: "Fungi" },
  { value: "Aves", label: "Birds" },
  { value: "Amphibia", label: "Amphibia" },
  { value: "Reptilia", label: "Reptilia" },
  { value: "Mammalia", label: "Mammalia" },
  { value: "Mollusca", label: "Mollusca" },
  { value: "Arachnida", label: "Arachnida" },
  { value: "Insecta", label: "Insecta" },
  { value: "Plantae", label: "Plantae" },
  { value: "Protozoa", label: "Protozoa" },
  { value: "unknown", label: "Unknown" },
];

export default function Observations() {
  const [taxa, setTaxa] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [observationCount, setObservationCount] = useState(0);
  const [identifierCount, setIdentifierCount] = useState(0);
  const [speciesCount, setSpeciesCount] = useState<number>(0);

  const [observations, setObservations] = useState<any[]>([]);
  const [species, setSpecies] = useState<any>([]);

  async function fetchData() {
    const { results: observations, total_results: observationCount } =
      await getObservations({
        page,
        taxa,
      });
    setObservationCount(observationCount);
    setObservations(observations);

    const { total_results: identifierCount } = await getIdentifiers({ taxa });
    setIdentifierCount(identifierCount);

    const { results: species, total_results: speciesCount } = await getSpecies({
      page,
      taxa,
    });
    setSpecies(species);
    setSpeciesCount(speciesCount);
  }

  async function loadMore() {
    setLoading(true);
    const { results } = await getSpecies({ page: page + 1, taxa });
    setSpecies([...species, ...results]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [taxa]);

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

        <select className="select" onChange={(e) => setTaxa(e.target.value)}>
          <option disabled selected>
            Select category
          </option>
          {taxaOptions.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>

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
