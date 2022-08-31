import { Link } from "react-router-dom";
import Hls from "hls.js";
import "./index.css";
import bird from "../../assets/movies/bird.mp4";
import { useLayoutEffect, useEffect, useRef, useState } from "react";

export default function Cameras() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoSrc = "http://a8150a7d4066.sn.mynetname.net:8080/hls/live.m3u8";

  function loadHls(el: any) {
    const hls = new Hls();
    hls.attachMedia(el);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(videoSrc);
      el.play();
    });
  }

  function play() {
    setIsPlaying(true);
  }

  return (
    <main className="cameras">
      <div className="container">
        <div className="camera-container">
          {isPlaying ? (
            <video
              className="livestream"
              crossOrigin="anonymous"
              ref={loadHls}
              src={videoSrc}
            />
          ) : (
            <button onClick={play}>&#9658;</button>
          )}
        </div>
      </div>
    </main>
  );
}
