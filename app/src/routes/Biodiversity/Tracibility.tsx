

export default function Tracibility() {
    return <div>
         <a-scene
        vr-mode-ui="enabled: false"
        arjs='sourceType: webcam; videoTexture: true; debugUIEnabled: false;'
        renderer='antialias: true; alpha: true'>
            <a-camera gps-projected-camera rotation-reader></a-camera>
            <a-box gps-projected-entity-place='latitude: 41.4501831; longitude: 2.1333803' material='color: red' scale='10 10 10'></a-box>
        </a-scene>
    </div>
}