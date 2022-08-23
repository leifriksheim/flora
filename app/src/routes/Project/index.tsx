import { useEffect, useRef } from "react";
import "./index.css";
import projectImg from "../../assets/img/project-top.png";

export default function Project() {
  return (
    <main className="project">
      <div className="container">
        <div className="article">
          <img className="main-image" src={projectImg}></img>
          <h1 className="main-heading">Project</h1>
          <p className="subtitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            risus id enim euismod hendrerit. Donec lacinia mollis sem sit amet
            laoreet.
          </p>

          <p>
            The Forest Lab for Observational Research and Analysis is a mass
            timber building located in the most extensive green space in the
            metropolitan area of Barcelona, Collserola Natural Park. Measuring
            over 8.5 metres in height, the master thesis project sources
            invasive pine trees within the park through rigorous forest
            management and traceability procedures. All seventy trees are then
            cut and the wood is then processed by the master students to create
            CLT panels.
          </p>
          <p>
            F.L.O.R.A will be used to house a researcher for a short period of
            time that will be studying the biodiversity of the park, furthermore
            will be using the new weather station introduced by F.L.O.R.A.
            Housing a bird simulator, bird houses, working and projection space,
            and bird watching spaces, the project seeks to be immersed within
            nature and to create an ecological interactive prototype.
          </p>
        </div>
      </div>
    </main>
  );
}
