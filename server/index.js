require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const fs = require("fs");
const tf = require("@tensorflow/tfjs-node");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const { createFFmpeg } = require("@ffmpeg/ffmpeg");

ffmpeg = createFFmpeg({
  log: true,
});

(async () => {
  try {
    await ffmpeg.load();

    const frameArray = [];
    await ffmpeg.run(
      "-i",
      "https://test-streams.mux.dev/test_001/stream.m3u8",
      "-vf",
      `select='between(t\,0\,99)`,
      "-vsync",
      "0",
      frameArray
    );

    console.log("Loading model...");
    const model = await cocoSsd.load();
    console.log("Model loaded");

    const res = await fetch("https://picsum.photos/200/300");
    console.log({ res });
    const img = await res.arrayBuffer();

    console.log({ img });

    const tensor = tf.tidy(() => {
      const buffer = new Uint8Array(img);
      return tf.node.decodeImage(buffer, 3);
    });

    // Classify the image.
    const predictions = await model.detect(tensor);

    console.log("Predictions: ");
    console.log(predictions);
  } catch (e) {
    console.log(e);
  }
})();
