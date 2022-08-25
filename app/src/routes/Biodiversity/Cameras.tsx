import { Link } from "react-router-dom";
import Hls from "hls.js";
import "./index.css";
import bird from "../../assets/movies/bird.mp4";
import { useLayoutEffect, useEffect, useRef } from "react";

export default function Cameras() {
  const videoSrc = "http://10.44.2.150:8000/hls/live.m3u8";

  function loadVideo(el: any) {
    if (el) {
      const hls = new Hls();
      console.log(el.src);
      hls.attachMedia(el);
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        hls.loadSource(videoSrc);
        hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          console.log(
            "manifest loaded, found " + data.levels.length + " quality level"
          );
          el.play();
        });
      });
    }
  }

  return (
    <main className="cameras">
      <div className="container">
        <Link to="/biodiversity">&#8592; Back</Link>
        <div className="camera-grid">
          <video
            className="livestream"
            autoPlay
            crossOrigin="anonymous"
            ref={loadVideo}
            src={videoSrc}
          />
        </div>
      </div>
    </main>
  );
}
