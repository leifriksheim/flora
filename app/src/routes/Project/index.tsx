import { useState } from "react";
import "./index.css";
import cn from "classnames";
import projectImg from "../../assets/img/project-top.png";
import massingSteps from "../../assets/img/massing-steps.svg?raw";
import students from "./students";

export default function Project() {
  const [step, setStep] = useState(0);

  return (
    <main className="project">
      <div className="container">
        <div className="article">
          <img className="main-image" src={projectImg}></img>
          <h1 className="main-heading">F.L.O.R.A</h1>
          <p className="subtitle">
            Made by students of the Institute of Advanced Architecture
            Catalunya, the building is set out to be a place to observe
            Collserolas Biodiversity.
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
          <div className="step-container">
            <div
              className={cn({
                step1: step >= 1,
                step2: step >= 2,
                step3: step >= 3,
                step4: step >= 4,
                step5: step >= 5,
                step6: step >= 6,
                step7: step >= 7,
              })}
              dangerouslySetInnerHTML={{ __html: massingSteps }}
            ></div>
            <div className="steps">{step + 1}/8</div>
            <div className="step-buttons">
              <button
                disabled={step === 0}
                onClick={() => step >= 1 && setStep(step - 1)}
                className="button"
              >
                Prev
              </button>
              <button
                disabled={step === 7}
                onClick={() => step < 7 && setStep(step + 1)}
                className="button"
              >
                Next
              </button>
            </div>
          </div>
          <p>
            F.L.O.R.A will be used to house a researcher for a short period of
            time that will be studying the biodiversity of the park, furthermore
            will be using the new weather station introduced by F.L.O.R.A.
            Housing a bird radio, bird houses, working and projection space, and
            bird watching spaces, the project seeks to be immersed within nature
            and to create an ecological interactive prototype.
          </p>
          <h2 className="h2">Collserola Park</h2>
          <p>
            Considered to be the most extensive green space in the metropolitan
            area of Barcelona, and covering over 8,000 hectares (seventeen
            kilometres long and six kilometres wide) with its highest peak of
            512 metres (Tibidabo), the Collserola Park is a recreational area
            and getaway for those living in Cerdanyola and in Barcelona.
          </p>
          <p>
            Flora within the area is of Mediterranean origin, located in the
            mountain range and nearby the sea, it houses 190 different types of
            vertebrates, Aleppo pine (Pinus halepensis) forests and has an
            estimated population of 1,000 species of plants and 10,000 million
            trees
          </p>
          <h2 className="h2">Who made it</h2>
          <div className="person-grid">
            {students.map((student: any) => {
              return <div key={student.name}>{student.name}</div>;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
