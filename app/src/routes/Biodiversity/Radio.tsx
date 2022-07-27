import { Link } from "react-router-dom";
import Hls from "hls.js";
import "./index.css";
import { useLayoutEffect, useEffect, useRef } from "react";
import Spectogram from "../../utils/spectogram.js";

export default function Cameras() {
  const audioRef = useRef<HTMLDivElement>();
  const spectogram = useRef();
  const isInit = useRef(false);

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
  }

  return (
    <main onClick={onClick} className="cameras">
      <div className="container">
        <div className="spectogram" ref={audioRef}></div>
      </div>
    </main>
  );
}
