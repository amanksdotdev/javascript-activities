let request = indexedDB.open("Camera", 1);
let db;

request.onupgradeneeded = (e) => {
    db = request.result;
    db.createObjectStore("gallery", { keyPath: "id" });
};

request.onsuccess = (e) => {
    db = request.result;
};

request.onerror = (e) => {
    alert(e.target.error);
};

function addMediaToGallery(data, type) {
    let tx = db.transaction("gallery", "readwrite");
    let gallery = tx.objectStore("gallery");
    let mediaData = {
        id: Date.now(),
        type,
        media: data,
    };
    gallery.add(mediaData);
}

function viewMedia() {
    let body = document.body;
    let tx = db.transaction("gallery", "readonly");
    let gallery = tx.objectStore("gallery");
    let req = gallery.openCursor();
    req.onsuccess = function () {
        let cursor = req.result;
        if (cursor) {
            if (cursor.value.type == "video") {
                let vidContainer = document.createElement("div");
                vidContainer.setAttribute("data-id", cursor.value.id);
                vidContainer.classList.add("gallery-vid-container");

                let video = document.createElement("video");
                video.controls = true;
                video.src = URL.createObjectURL(cursor.value.media);
                vidContainer.appendChild(video);

                let deletebtn = document.createElement("button");
                deletebtn.classList.add("gallery-delete-btn");
                deletebtn.innerText = "Delete";
                vidContainer.appendChild(deletebtn);

                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("gallery-download-btn");
                downloadBtn.innerText = "Download";
                vidContainer.appendChild(downloadBtn);

                downloadBtn.addEventListener("click", () => {
                    let a = document.createElement("a");
                    a.href = video.src;
                    a.download = "video.mp4";
                    a.click();
                    a.remove();
                });

                deletebtn.addEventListener("click", () => {
                    let id = vidContainer.getAttribute("data-id");

                    let tx = db.transaction("gallery", "readwrite");
                    let gallery = tx.objectStore("gallery");
                    gallery.delete(Number(id));
                    vidContainer.remove();
                });

                body.appendChild(vidContainer);
            } else {
                let imgContainer = document.createElement("div");
                imgContainer.setAttribute("data-id", cursor.value.id);
                imgContainer.classList.add("gallery-img-container");

                let img = document.createElement("img");
                img.src = cursor.value.media;
                imgContainer.appendChild(img);

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("gallery-delete-btn");
                deleteBtn.innerText = "Delete";

                let downloadBtn = document.createElement("button");
                downloadBtn.classList.add("gallery-download-btn");
                downloadBtn.innerText = "Download";

                imgContainer.appendChild(deleteBtn);
                imgContainer.appendChild(downloadBtn);
                body.appendChild(imgContainer);

                downloadBtn.addEventListener("click", () => {
                    let a = document.createElement("a");
                    a.href = img.src;
                    a.download = "img.png";
                    a.click();
                    a.remove();
                });

                deleteBtn.addEventListener("click", () => {
                    let id = imgContainer.getAttribute("data-id");

                    let tx = db.transaction("gallery", "readwrite");
                    let gallery = tx.objectStore("gallery");
                    gallery.delete(Number(id));
                    imgContainer.remove();
                });
            }
            cursor.continue();
        }
    };
}



// location.assign(url) --> instead of <a/> we could use this to change active location using javascript


