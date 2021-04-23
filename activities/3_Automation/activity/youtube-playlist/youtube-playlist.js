let puppeteer = require("puppeteer");
let fs = require("fs");
// no of videos
// views
// watch time -> get
// list of videos -> [name, duration]
// initial page data get
// handle -> loader

console.log("Before");
// let arr=document.querySelectorAll("#stats  .style-scope.ytd-playlist-sidebar-primary-info-renderer")
// let newarr=[]
// newarr.push(arr[0].innerText,arr[1].innerText)
(async function () {
    try {
        let browserInstance = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
        });
        let newPage = await browserInstance.newPage();
        await newPage.goto(
            "https://www.youtube.com/playlist?list=PLRBp0Fe2GpgnIh0AiYKh7o7HnYAej-5ph"
        );
        // evaluate

        const playlistInfo = await newPage.evaluate(getPlaylistInfo);
        const totalVideoCount = Number(playlistInfo[0].split(" ")[0]);

        let currentVideoCount = await scrollToBottom(newPage);
        while (currentVideoCount < totalVideoCount - 50) {
            currentVideoCount = await scrollToBottom(newPage);
        }
        const videoData = await newPage.evaluate(getVideoData);
        console.table(videoData);
    } catch (err) {
        console.log(err);
    }
})();

function scrollToBottom(newPage) {
    function getLengthConsoleFn() {
        window.scrollBy(0, window.innerHeight);

        let videoDuration = document.querySelectorAll(
            "span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
        );
        return videoDuration.length;
    }

    return newPage.evaluate(getLengthConsoleFn);
}

function getPlaylistInfo() {
    let playlistInfo = document.querySelectorAll(
        "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer"
    );
    playlistInfo = [playlistInfo[0].innerText, playlistInfo[1].innerText];
    return playlistInfo;
}

function getVideoData() {
    let videoNames = document.querySelectorAll(
        "a.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer"
    );
    let videoDuration = document.querySelectorAll(
        "span.style-scope.ytd-thumbnail-overlay-time-status-renderer"
    );
    let videoData = [];
    for (let i = 0; i < videoDuration.length; i++) {
        videoData.push({
            title: videoNames[i].textContent.trim(),
            duration: videoDuration[i].textContent.trim(),
        });
    }
    return videoData;
}
