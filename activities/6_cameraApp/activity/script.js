"use strict";

const videoEl = document.querySelector("#video");
const recordEl = document.querySelector(".camera__btn--record");
const clickEl = document.querySelector(".camera__btn--click");
const box = document.querySelector(".box");

const constraints = { video: true };

let mediaRecorder,
    chunks = [],
    recordFlag = false;

//FUNCTIONS
const recordFn = function () {
    if (mediaRecorder != undefined) {
        if (recordFlag == false) {
            recordFlag = true;
            mediaRecorder.start();
            recordEl.classList.add("recording");
            box.classList.remove("hidden");
        } else {
            recordFlag = false;
            mediaRecorder.stop();
            recordEl.classList.remove("recording");
            box.classList.add("hidden");
        }
    }
};

const animateClickBtn = function () {
    clickEl.style.backgroundColor = "blue";
    clickEl.style.border = "6px solid white";
    setTimeout(() => {
        clickEl.style.backgroundColor = "white";
        clickEl.style.border = "6px solid blue";
    }, 1000);
};

const captureImg = function () {
    animateClickBtn;
    let c = document.createElement("canvas");
    c.width = videoEl.videoWidth;
    c.height = videoEl.videoHeight;
    let tool = c.getContext("2d");
    tool.drawImage(videoEl, 0, 0);
    let link = document.createElement("a");
    link.download = "image.png";
    link.href = c.toDataURL();
    link.click();
    link.remove();
    c.remove();
};

//EVENT LISTENER
recordEl.addEventListener("click", recordFn);
clickEl.addEventListener("click", captureImg);

// async IIFE for video capture
(async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
            constraints
        );
        videoEl.srcObject = mediaStream;

        mediaRecorder = new MediaRecorder(mediaStream);

        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        };

        //on recording stop, create a blob and anchor with blob url click the anchor to download media then remove the anchor
        mediaRecorder.onstop = function () {
            let blob = new Blob(chunks, { type: "video/mp4" });
            //reset chunks
            chunks = [];
            let blobURL = URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.href = blobURL;
            link.download = "video.mp4";
            link.click();
            link.remove();
        };
    } catch (err) {
        console.log(err);
    }
})();
