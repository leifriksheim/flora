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

  const audioSrc =
    "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8";

  useEffect(() => {
    if (audioRef.current && !isInit.current) {
      console.log("run");
      // @ts-ignore
      spectogram.current = new Spectogram({
        el: audioRef.current,
        audioSrc: "http://edge-audio-03-gos2.sharp-stream.com/rspb.mp3",
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
    spectogram.current.start();
    setClicked(true);
  }

  return (
    <main onClick={onClick} className="cameras">
      {!hasClicked && <div className="click-to-start">Click to start</div>}
      <div className="container">
        <div className="spectogram" ref={audioRef}></div>
      </div>
    </main>
  );
}
