import { useEffect, useLayoutEffect, useRef } from "react";
import "./index.css";
import imgUrl from "../../assets/img/flora-line.png";
import svg from "../../assets/img/massing-clean.svg?raw";
/* ts-ignore */

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const svgRef = use;

  useLayoutEffect(() => {}, []);

  return (
    <main>
      <div className="home-content">
        <div>
          <h1>A forest lab for observational research and analysis</h1>
          <h2>26 C° / 101325 Pa / 60φ</h2>
        </div>
        <div
          className="illustration"
          dangerouslySetInnerHTML={{ __html: svg }}
        ></div>
      </div>
    </main>
  );
}
