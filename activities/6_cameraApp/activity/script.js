"use strict";

const videoEl = document.querySelector("#video");
const recordEl = document.querySelector(".camera__btn--record");
const clickEl = document.querySelector(".camera__btn--click");
const box = document.querySelector(".box");

const constraints = { video: true };

let mediaRecorder,
    chunks = [],
    recordFlag = false;

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
recordEl.addEventListener("click", recordFn);

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
