"use strict";

const colorBtn = document.querySelectorAll(".priority");
const contentContainer = document.querySelector(".content-container");

const addBtn = document.querySelector(".ctrl-btn-add");
const taskCreator = document.querySelector(".task-creator");
const taskTextArea = document.getElementById("task-text");
const overlay = document.querySelector(".overlay");

const colorboxes = document.querySelectorAll(".color-box");

const removeCreatorBtn = document.querySelector(".overlay-btn-remove");

addBtn.addEventListener("click", () => {
    taskCreator.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

removeCreatorBtn.addEventListener("click", () => {
    taskCreator.classList.add("hidden");
    overlay.classList.add("hidden");
});

taskCreator.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        const taskTextArea = document.getElementById("task-text");
        const text = taskTextArea.value;
        const div = document.createElement("div");
        div.classList.add("task");
        div.classList.add();
        div.textContent = text;
        contentContainer.appendChild(div);

        taskTextArea.value = "";
        taskCreator.classList.add("hidden");
        overlay.classList.add("hidden");
    }
});

for (let i = 0; i < colorBtn.length; i++) {
    colorBtn[i].addEventListener("click", (e) => {
        const color = colorBtn[i].classList[2];
        contentContainer.style.backgroundColor = color;
    });
}

for (let colorBox of colorboxes) {
    colorBox.addEventListener("click", () => {
        colorBox.classList.toggle("selected-border");
    });
}
