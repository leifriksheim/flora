import * as THREE from "https://cdn.skypack.dev/three@0.130.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.130.0/examples/jsm/controls/OrbitControls.js";
import colormap from "https://cdn.skypack.dev/colormap";
export default class Spectrogram {
  el = null;
  audioEl = null;
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
  animate = this.animate.bind(this);
  initAudioContext = this.initAudioContext.bind(this);
  initThree = this.initThree.bind(this);
  updateGeometry = this.updateGeometry.bind(this);
  render = this.render.bind(this);
  onWindowResize = this.onWindowResize.bind(this);

  constructor(props) {
    this.el = document.querySelector(props.el);

    window.addEventListener(
      "click",
      () => {
        this.initAudioContext();
        this.initThree();
      },
      { once: true }
    );
  }

  initAudioContext() {
    /*
    this.audioEl = document.querySelector("audio");
    this.audioEl.crossOrigin = "anonymous";
    this.audioEl.play();
    */
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 4 * this.frequencySamples;
    this.analyser.smoothingTimeConstant = 0.5;
    this.analyserData = new Uint8Array(this.analyser.frequencyBinCount);

    //this.source = this.audioContext.createMediaElementSource(this.audioEl);
    //this.source.connect(this.analyser);
    //this.source.connect(this.audioContext.destination);

    navigator.mediaDevices
      .getUserMedia({ audio: { echoCancellation: false }, video: false })
      .then((stream) => {
        this.source = this.audioContext.createMediaStreamSource(stream);
        this.source.connect(this.analyser);
      });
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

  initThree() {
    this.camera = new THREE.PerspectiveCamera(
      27,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 64;

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
      format: "float",
      alpha: 1,
    })
      .reverse()
      .map((c, i) => (i === 0 ? [1, 1, 1] : [c[0], c[1], c[2]]));

    var lut = [];
    for (let n = 0; n < numShades; n++) {
      lut.push(
        new THREE.Vector3(
          (string[n][0] * 255 - 49) / 206,
          (string[n][1] * 255 - 19) / 236,
          (string[n][2] * 255 - 50) / 190
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
    // geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

    var vShader = document.getElementById("vertexshader");
    var fShader = document.getElementById("fragmentshader");
    var uniforms = {
      vLut: { type: "v3v", value: lut },
    };

    let material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vShader.text,
      fragmentShader: fShader.text,
      blending: THREE.NormalBlending,
      transparent: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.el.appendChild(this.renderer.domElement);

    this.mesh.geometry.computeFaceNormals();
    this.mesh.geometry.computeVertexNormals();

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    window.addEventListener("resize", this.onWindowResize, false);

    this.animate();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
