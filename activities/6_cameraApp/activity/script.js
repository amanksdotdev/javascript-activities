"use strict";

const videoEl = document.querySelector("#video");
const recordEl = document.querySelector(".camera__btn--record");
const clickEl = document.querySelector(".camera__btn--click");
const box = document.querySelector(".box"); //video recorder btn hidden div
const constraints = { video: true };

let mediaRecorder,
    chunks = [],
    recordFlag = false,
    currZoom = 1,
    filter = "";

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
    animateClickBtn();
    let c = document.createElement("canvas");
    c.width = videoEl.videoWidth;
    c.height = videoEl.videoHeight;
    let tool = c.getContext("2d");
    //origin shifting
    tool.translate(c.width / 2, c.height / 2);
    //scaling
    tool.scale(currZoom, currZoom);
    //moving back the origin
    tool.translate(-c.width / 2, -c.height / 2);
    tool.drawImage(videoEl, 0, 0);
    if (filter != "") {
        tool.fillStyle = filter;
        tool.fillRect(0, 0, c.width, c.height);
        console.log("filled");
    }

    addMediaToGallery(c.toDataURL(), "img");
    c.remove();
    // let link = document.createElement("a");
    // link.download = `${date.toDateString().split(" ").join("-")}.png`;
    // link.href = c.toDataURL();
    // link.click();
    // link.remove();
    // c.remove();
};

const removeFilter = function () {
    let el = document.querySelector(".on-screen-filter");
    if (el) {
        el.remove();
        filter = "";
    }
};

const addFilter = function (color) {
    let oldFilter = document.querySelector(".on-screen-filter");
    // console.log(oldFilter);
    if (oldFilter != null) {
        // console.log("inside old filter");
        if (color == oldFilter.style.backgroundColor) {
            // console.log("inside same color");
            removeFilter();
            return;
        }
    }

    removeFilter();
    let filterDiv = document.createElement("div");
    filterDiv.classList.add("on-screen-filter");
    filterDiv.style.height = "100vh";
    filterDiv.style.width = "100vw";
    filterDiv.style.backgroundColor = `${color}`;
    console.log(color);
    filterDiv.style.position = "fixed";
    filterDiv.style.top = "0px";
    document.body.appendChild(filterDiv);

    filter = color;
};

//EVENT LISTENER
recordEl.addEventListener("click", recordFn);
clickEl.addEventListener("click", captureImg);

const allFilters = document.querySelectorAll(".camera__filter");
for (let filter of allFilters) {
    filter.addEventListener("click", (e) => {
        let color = e.target.style.backgroundColor;
        filter = color;
        addFilter(color);
    });
}

const zoomin = document.querySelector(".zoomin");
const zoomout = document.querySelector(".zoomout");

zoomin.addEventListener("click", () => {
    let vidScale = Number(videoEl.style.transform.split("(")[1].split(")")[0]);
    console.log(vidScale);
    if (vidScale < 3) {
        currZoom = vidScale + 0.1;
        videoEl.style.transform = `scale(${currZoom})`;
    }
});

zoomout.addEventListener("click", () => {
    let vidScale = Number(videoEl.style.transform.split("(")[1].split(")")[0]);
    console.log("hahah");
    if (vidScale > 1) {
        currZoom = vidScale - 0.1;
        videoEl.style.transform = `scale(${currZoom})`;
    }
});

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
            addMediaToGallery(blob, "video");
        };
    } catch (err) {
        console.log(err);
    }
})();
