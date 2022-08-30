import { useEffect, useState } from "react";

const trees = [
  { id: "A-1", lat: 41.4505, long: 2.1333 },
  { id: "A-2", lat: 41.45, long: 2.1333 },
  { id: "A-3", lat: 41.4625, long: 2.13805 },
  { id: "A-4", lat: 41.477224, long: 2.1475 },
  { id: "A-5", lat: 41.506, long: 2.188 },
  { id: "B-1", lat: 41.52138, long: 2.116 },
  { id: "B-2", lat: 41.511, long: 2.11916 },
  { id: "B-3", lat: 41.5025, long: 2.1213 },
  { id: "B-4", lat: 41.47027, long: 2.12916 },
  { id: "B-5", lat: 41.44916, long: 2.1344 },
  { id: "B-6", lat: 41.4783, long: 2.1275 },
  { id: "B-7", lat: 41.51972, long: 2.1172 },
  { id: "C-1", lat: 41.51638, long: 2.0997223 },
  { id: "C-2", lat: 41.48138, long: 2.10583 },
  { id: "C-3", lat: 41.4483, long: 2.1358 },
  { id: "C-4", lat: 41.45, long: 2.1338 },
  { id: "C-5", lat: 41.515, long: 2.11805 },
  { id: "C-6", lat: 41.44861, long: 2.1358 },
  { id: "C-7", lat: 41.448, long: 2.135 },
  { id: "C-8", lat: 41.464, long: 2.1313 },
  { id: "C-9", lat: 41.44972, long: 2.1338 },
  { id: "C-10", lat: 41.4494, long: 2.1358 },
  { id: "C-11", lat: 41.45, long: 2.1358 },
  { id: "C-12", lat: 41.45027, long: 2.1358 },
  { id: "C-13", lat: 41.45, long: 2.135 },
  { id: "C-14", lat: 41.44972, long: 2.13472 },
  { id: "C-15", lat: 41.5047, long: 2.1105 },
  { id: "C-16", lat: 41.4505, long: 2.135 },
  { id: "C-17", lat: 41.45083, long: 2.13527 },
  { id: "C-18", lat: 41.45083, long: 2.135 },
  { id: "C-19", lat: 41.4494, long: 2.13472 },
];

export default function Tracibility() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      // true for mobile device
      setIsMobile(true);
    }
  }, []);

  if (!isMobile) {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          You need a mobile device to test this
        </h1>
      </div>
    );
  }

  return (
    <div>
      <a-scene
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false;"
        renderer="antialias: true; alpha: true"
      >
        <a-camera
          gps-camera="simulateLatitude: 41.4505; simulateLongitude: 2.1333"
          rotation-reader
        ></a-camera>

        {trees.map((tree) => {
          return (
            <a-text
              key={tree.id}
              value={tree.id}
              look-at="[gps-camera]"
              gps-entity-place={`latitude: ${tree.lat}; longitude: ${tree.long};`}
              scale="15 15 15"
            ></a-text>
          );
        })}
      </a-scene>
    </div>
  );
}
