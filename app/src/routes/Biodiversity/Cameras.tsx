import { Link } from "react-router-dom";
import Hls from "hls.js";
import "./index.css";
import { useLayoutEffect, useEffect, useRef } from "react";

export default function Cameras() {
  const videoSrc =
    "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8";

  function loadVideo(ref: any) {
    if (ref) {
      const hls = new Hls();
      hls.loadSource(ref.src);
      hls.attachMedia(ref);
    }
  }

  return (
    <main className="cameras">
      <div className="container">
        <Link to="/biodiversity">&#8592; Back</Link>
        <p>Cameras</p>
        <div className="camera-grid">
          <video ref={loadVideo} src={videoSrc} />
          <video ref={loadVideo} src={videoSrc} />
          <video ref={loadVideo} src={videoSrc} />
        </div>
      </div>
    </main>
  );
}