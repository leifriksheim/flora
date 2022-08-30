import { Link } from "react-router-dom";
import Hls from "hls.js";
import "./index.css";
import { useState, useEffect, useRef } from "react";
// @ts-ignore
import Spectogram from "../../utils/spectogram.js";

export default function Cameras() {
  const audioRef = useRef<HTMLDivElement>(null);
  const spectogram = useRef<any>();
  const isInit = useRef(false);
  const [hasClicked, setClicked] = useState(false);

  useEffect(() => {
    if (audioRef.current && !isInit.current) {
      console.log("run");
      // @ts-ignore
      spectogram.current = new Spectogram({
        el: audioRef.current,
        audioSrc: "http://10.44.2.150:8888/out.mp3",
      });
      isInit.current = true;
    }

    return () => {
      // @ts-ignore
      if (spectogram?.current) {
        spectogram.current.stop();
      }
    };
  }, [audioRef.current]);

  function onClick() {
    // @ts-ignore
    setClicked(true);
    setTimeout(() => {
      spectogram.current.start();
    }, 100);
  }

  return (
    <main onClick={onClick} className="cameras">
      <div
        style={{
          opacity: hasClicked ? 0 : 1,
          cursor: hasClicked ? "defalut" : "pointer",
        }}
        className="click-to-start"
      >
        Click to start radio
      </div>

      <div className="container">
        <div className="spectogram" ref={audioRef}></div>
      </div>
    </main>
  );
}
