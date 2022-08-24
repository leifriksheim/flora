import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./index.css";
import cn from "classnames";
import imgUrl from "../../assets/img/flora-line.png";
import house from "../../assets/img/massing-clean.svg?raw";
import flower1 from "../../assets/img/1_Flower.svg?raw";
import flower2 from "../../assets/img/2_Flower.svg?raw";
import flower6 from "../../assets/img/6_Flower.svg?raw";
import flower7 from "../../assets/img/7_Flower.svg?raw";
import butterfly from "../../assets/img/3_Butterfly.svg?raw";
import Vivus from "vivus";
import Menu from "../../components/Menu";
/* ts-ignore */

export default function Home() {
  const [finished, setFinished] = useState(false);
  const svgContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    /* @ts-ignore */
    if (svgContainer.current) {
      const svg = svgContainer.current?.firstChild;

      const myVivus = new Vivus(
        svg,
        {
          duration: 50,
          start: "autostart",
          type: "oneByOne",
          onReady: () => {
            /* @ts-ignore */
            svgContainer.current.style.display = "block";
          },
        },
        (obj: any) => {
          setFinished(true);
        }
      );
    }
  }, []);

  return (
    <main>
      <div className={cn({ illustrations: true, finished })}>
        <div
          className="flower1"
          dangerouslySetInnerHTML={{ __html: flower1 }}
        ></div>
        <div
          className="flower2"
          dangerouslySetInnerHTML={{ __html: flower2 }}
        ></div>
        <div
          className="flower6"
          dangerouslySetInnerHTML={{ __html: flower6 }}
        ></div>
        <div
          className="flower7"
          dangerouslySetInnerHTML={{ __html: flower7 }}
        ></div>
        <div
          className="butterfly"
          dangerouslySetInnerHTML={{ __html: butterfly }}
        ></div>
      </div>
      <div className="home-content">
        <div>
          <h1>A forest lab for observational research and analysis</h1>
          <h2>26 C° / 101325 Pa / 60φ</h2>
        </div>
        <div
          style={{ display: "none" }}
          className="illustration"
          ref={svgContainer}
          dangerouslySetInnerHTML={{ __html: house }}
        ></div>
      </div>
      <div style={{ padding: "var(--gutter)" }}>
        <Menu></Menu>
      </div>
    </main>
  );
}
