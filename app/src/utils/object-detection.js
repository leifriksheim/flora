import Hls from "hls.js";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as CocoSsd from "@tensorflow-models/coco-ssd";

const pace = window.requestIdleCallback || window.requestAnimationFrame;

function getStreamUrl() {
  const default_stream = "http://10.44.2.150:8080/hls/live.m3u8";
  const params = new URLSearchParams(document.location.search.substring(1));
  return params.get("m3u8") || default_stream;
}

function getClasses() {
  const default_classes = "person";
  const params = new URLSearchParams(document.location.search.substring(1));
  return (params.get("classes") || default_classes).split(",");
}

function createVideoStream(video, url) {
  video.setAttribute("crossOrigin", "anonymous");
  video.volume = 0;
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, () => video.play());
  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.setAttribute("src", url);
    video.addEventListener("canplay", () => video.play());
  }
  return new Promise((resolve) =>
    video.addEventListener("loadeddata", () => {
      video.setAttribute("hidden", "hidden");
      resolve(video);
    })
  );
}

async function startDetection(model, video) {
  let detectionCallback = null;
  const callback = async () => {
    let predictions = [];
    try {
      predictions = await model.detect(video);
    } catch (error) {
      pace(callback);
    }
    if (detectionCallback) {
      detectionCallback(predictions);
    }
    pace(callback);
  };
  return (onDetection) => {
    detectionCallback = onDetection;
    pace(callback);
  };
}

function drawPredictions(video, onDetection) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  onDetection((predictions) => {
    const matchingPredictions = getMatchingPredictions(predictions);
    showFullVideo(matchingPredictions, context, video);
  });
  return canvas;
}

function getMatchingPredictions(predictions) {
  const categories = getClasses();
  return predictions
    .filter(
      ({ class: category, score }) =>
        score > 0.5 && categories.includes(category)
    )
    .map(({ bbox }) => bbox);
}

function showFullVideo(matchingPredictions, context, video) {
  context.drawImage(video, 0, 0);
  matchingPredictions.forEach((pred) => {
    console.log(pred);
    context.beginPath();
    context.rect(pred[0], pred[1], pred[2], pred[3]);
    context.stroke();
    //context.fillText("person", 10, 50);
  });
}

export async function init() {
  const videoNode = document.querySelector("video");
  console.log(videoNode);
  const model = await CocoSsd.load();
  const video = await createVideoStream(videoNode, getStreamUrl());
  const onDetection = await startDetection(model, video);
  const canvas = drawPredictions(video, onDetection);
  videoNode.parentNode.appendChild(canvas);
}
