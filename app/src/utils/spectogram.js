import * as THREE from "three";
import colormap from "colormap";
import fragmentShader from "./fragmentshader.gsl?raw";
import vertexShader from "./vertexshader.gsl?raw";

export default class Spectrogram {
  el = null;
  audioEl = null;
  audioSrc = "";
  source = null;
  firstClick = false;
  birdDetections = [];
  frequencySamples = 256;
  timeSamples = 400;
  nVertices = (this.frequencySamples + 1) * (this.timeSamples + 1);
  scene = null;
  renderer = null;
  camera = null;
  audioContext = null;
  analyser = null;
  analyserData = null;
  mesh = null;
  heights = null;
  stream = null;
  animate = this.animate.bind(this);
  initAudioContext = this.initAudioContext.bind(this);
  initThree = this.initThree.bind(this);
  updateGeometry = this.updateGeometry.bind(this);
  render = this.render.bind(this);
  onWindowResize = this.onWindowResize.bind(this);

  constructor(props) {
    this.audioSrc = props.audioSrc;
    this.el =
      props.el instanceof HTMLElement
        ? props.el
        : document.querySelector(props.el);
    this.initThree();
  }

  start() {
    if (!this.audioContext) {
      this.initAudioContext();
    }
  }

  stop() {
    if (this.audioEl) {
      this.audioEl.pause();
    }
  }

  initAudioContext() {
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 4 * this.frequencySamples;
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyserData = new Uint8Array(this.analyser.frequencyBinCount);

    this.audioEl = document.createElement("audio");
    this.audioEl.src = this.audioSrc;
    document.body.append(this.audioEl);
    this.audioEl.crossOrigin = "anonymous";
    this.audioEl.play();
    this.source = this.audioContext.createMediaElementSource(this.audioEl);
    this.source.connect(this.analyser);
    this.source.connect(this.audioContext.destination);
  }

  animate() {
    this.requestId = requestAnimationFrame(this.animate);
    this.render();
  }

  render() {
    this.updateGeometry();
    this.renderer.render(this.scene, this.camera);
  }

  updateGeometry() {
    if (this.audioContext) {
      this.analyser.getByteFrequencyData(this.analyserData);
      let start_val = this.frequencySamples + 1;
      let end_val = this.nVertices - start_val;
      this.heights.copyWithin(0, start_val, this.nVertices + 1);

      this.heights.set(this.analyserData, end_val - start_val);
      this.mesh.geometry.setAttribute(
        "displacement",
        new THREE.Uint8BufferAttribute(this.heights, 1)
      );
    }
  }

  initThree() {
    this.camera = new THREE.PerspectiveCamera(
      27,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 50;

    this.scene = new THREE.Scene();
    let geometry = new THREE.BufferGeometry();

    let indices = [];
    this.heights = [];
    let vertices = [];

    // number of time samples
    let xsize = 35;
    let ysize = 20;

    let xsegments = this.timeSamples;
    let ysegments = this.frequencySamples;
    let xhalfSize = xsize / 2;
    let yhalfSize = ysize / 2;
    let xsegmentSize = xsize / xsegments;
    let ysegmentSize = ysize / ysegments;

    // generate vertices and color data for a simple grid geometry

    for (let i = 0; i <= xsegments; i++) {
      let x = i * xsegmentSize - xhalfSize;

      for (let j = 0; j <= ysegments; j++) {
        let y = j * ysegmentSize - yhalfSize;

        vertices.push(x, y, 0);
        this.heights.push(0);
      }
    }

    // generate indices (data for element array buffer)

    for (let i = 0; i < xsegments; i++) {
      for (let j = 0; j < ysegments; j++) {
        let a = i * (ysegments + 1) + (j + 1);
        let b = i * (ysegments + 1) + j;
        let c = (i + 1) * (ysegments + 1) + j;
        let d = (i + 1) * (ysegments + 1) + (j + 1);

        // generate two faces (triangles) per iteration
        indices.push(a, b, d); // face one
        indices.push(b, c, d); // face two
      }
    }

    const numShades = 256;

    let string = colormap({
      colormap: "greens",
      nshades: numShades,
      format: "rgba",
      alpha: 1,
    })
      .reverse()
      .map((c, i) => (i === 0 ? [255, 255, 255] : [c[0], c[1], c[2]]));

    var lut = [];
    for (let n = 0; n < numShades; n++) {
      lut.push(
        new THREE.Vector3(
          (string[n][0] - 49) / 206,
          (string[n][1] - 19) / 236,
          (string[n][2] - 50) / 190
        )
      );
    }

    this.heights = new Uint8Array(this.heights);
    //

    geometry.setIndex(indices);
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute(
      "displacement",
      new THREE.Uint8BufferAttribute(this.heights, 1)
    );

    var uniforms = {
      vLut: { type: "v3v", value: lut },
    };

    let material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: THREE.NormalBlending,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    //this.mesh.geometry.computeFaceNormals();
    this.mesh.geometry.computeVertexNormals();

    const { clientHeight, clientWidth } = this.el;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(clientWidth, clientHeight);
    console.log("append");
    this.el.appendChild(this.renderer.domElement);

    //const controls = new OrbitControls(this.camera, this.renderer.domElement);
    //controls.enableZoom = false;
    window.addEventListener("resize", this.onWindowResize, false);

    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = this.el.clientWidth / this.el.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.el.clientWidth, this.el.clientHeight);
  }
}
