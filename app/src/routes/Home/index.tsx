import { useEffect, useLayoutEffect, useRef } from "react";
import "./index.css";
import imgUrl from "../../assets/img/flora-line.png";
import svg from "../../assets/img/massing-clean.svg?raw";
import Vivus from "vivus";
/* ts-ignore */

export default function Home() {
  const svgContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const svg = svgContainer.current?.firstChild;

    const myVivus = new Vivus(
      svg,
      { start: "autostart", type: "oneByOne" },
      (obj: any) => {
        obj.el.classList.add("finished");
      }
    );
  }, []);

  return (
    <main>
      <div className="home-content">
        <div>
          <h1>A forest lab for observational research and analysis</h1>
          <h2>26 C° / 101325 Pa / 60φ</h2>
        </div>
        <div
          className="illustration"
          ref={svgContainer}
          dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
      </div>
    </main>
  );
}
