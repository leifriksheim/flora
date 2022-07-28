import { useEffect, useState, useRef } from "react";
import "./index.css";

type Observation = {
  name: String;
};

async function getObservations() {
  const res = await fetch(
    "https://api.inaturalist.org/v1/observations?nelat=41.450501&nelng=2.133909&place_id=any&subview=map&swlat=41.450154&swlng=2.133768"
  );
  const json = await res.json();
  return json.results;
}

export default function Observations() {
  const [res, setRes] = useState<Observation[]>([]);

  async function fetchObservations() {
    const res = await getObservations();
    console.log(res);
    setRes(res);
  }

  useEffect(() => {
    fetchObservations();
  }, []);

  return (
    <main className="observations">
      <div className="container">
        <div className="grid">
          {res.map((observation: any) => {
            return (
              <a href={observation.taxon?.wikipedia_url} target="_blank">
                <article className="observation">
                  <img
                    loading="lazy"
                    className="observation__photo"
                    src={observation.photos[0].url.replace(
                      "square",
                      "large"
                    )}
                  ></img>

                  <div className="observation__taxon">
                    {observation.taxon?.iconic_taxon_name}
                  </div>
                  <h2 className="observation__title">
                    {observation.taxon?.preferred_common_name ||
                      observation.taxon?.name ||
                      "Unkown"}
                  </h2>

                  <small>Observation by {observation.user.name}</small>
                </article>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
