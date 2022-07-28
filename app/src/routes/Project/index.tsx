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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            risus id enim euismod hendrerit. Donec lacinia mollis sem sit amet
            laoreet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            risus id enim euismod hendrerit. Donec lacinia mollis sem sit amet
            laoreet.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            risus id enim euismod hendrerit. Donec lacinia mollis sem sit amet
            laoreet.
          </p>
        </div>
      </div>
    </main>
  );
}
