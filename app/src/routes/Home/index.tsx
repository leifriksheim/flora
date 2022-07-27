import {useRef } from "react";
import "./index.css";
import imgUrl from "../../assets/img/flora-line.png";

/* ts-ignore */

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <main>
      <div className="home-content">
        <div>
          <h1>A forest lab for observational research and analysis</h1>
          <h2>26 C° / 101325 Pa / 60φ</h2>
        </div>
        <img src={imgUrl}></img>
      </div>
    </main>
  );
}
