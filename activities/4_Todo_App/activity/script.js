"use strict";

//DOM ELEMENTS
const colorBtn = document.querySelectorAll(".priority");
const contentContainer = document.querySelector(".content-container");
const addBtn = document.querySelector(".ctrl-btn-add");
const deleteBtn = document.querySelector(".ctrl-btn-remove");
const taskTextArea = document.getElementById("task-text-input");
const overlay = document.querySelector(".overlay");
const taskCreator = document.querySelector(".task-creator");
const removeTaskCreatorBtn = document.querySelector(".overlay-btn-remove");
const priority = document.querySelectorAll(".priority");

//default color
let selectedColor = "purple";

//FUNCTIONS
//fn to reset color to default purple color and reset selected colorbox
const resetColor = function () {
    selectedColor = "purple";
    const colorboxes = document.querySelectorAll(".color-box");
    for (let cb of colorboxes) {
        cb.classList.remove("selected-border");
    }
};

// fn to change color of cards by clicking on them
const changeColor = function (e) {
    let taskFilter = e.currentTarget;
    let colors = ["purple", "green", "yellow", "red"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    let newColor = colors[newColorIdx];
    taskFilter.classList.add(newColor);

    let taskEl = taskFilter.parentNode.children[1];
    let uid = taskEl.children[0].innerText;

    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        if ("#" + id == uid) {
            taskArr[i].color = newColor;
            localStorage.setItem("allTask", JSON.stringify(taskArr));
        }
    }
};

// open modal
const openTaskCreator = function () {
    taskCreator.classList.remove("hidden");
    overlay.classList.remove("hidden");

    handleInput();
};

// function to close modal
const closeTaskCreator = function () {
    resetColor();
    taskCreator.classList.add("hidden");
    overlay.classList.add("hidden");
};

// handle input given in modal
const handleInput = function () {
    const colorboxes = document.querySelectorAll(".color-box");
    document.getElementById("task-text-input").focus();

    colorboxes[0].classList.add("selected-border");
    for (let colorBox of colorboxes) {
        colorBox.addEventListener("click", () => {
            for (let cb of colorboxes) {
                cb.classList.remove("selected-border");
            }
            colorBox.classList.add("selected-border");
            selectedColor = colorBox.classList[1];
        });
    }

    taskTextArea.addEventListener("keydown", (e) => {
        if (e.key == "Enter" && taskTextArea.value != "") {
            taskCreator.classList.add("hidden");
            overlay.classList.add("hidden");
            createTask(selectedColor, taskTextArea.value, true);
            resetColor();
        }
    });
};

//handle lock
const handleLock = function (task, lockBtn) {
    let isUnlocked = task.getAttribute("contenteditable");
    isUnlocked = isUnlocked == "true"; // convert str to bool
    task.setAttribute("contenteditable", `${!isUnlocked}`);

    if (isUnlocked) {
        lockBtn.classList.remove("fa-unlock");
        lockBtn.classList.add("fa-lock");
    } else {
        lockBtn.classList.remove("fa-lock");
        lockBtn.classList.add("fa-unlock");
    }
};

// function to create task
const createTask = function (color, text, flag, id) {
    let uifn = new ShortUniqueId();
    let uid = id || uifn();
    const div = document.createElement("div");
    div.classList.add("task-container");
    div.innerHTML = ` <div class="task-filter ${color}"></div>
        <div class="task">
            <div class="task-id">#${uid}</div>
            <div class="task-text--div" contenteditable="false">${text}</div>
            <i class="fa fa-lock lock-btn"></i>
        </div>`;
    contentContainer.appendChild(div);
    taskTextArea.value = "";

    if (flag) {
        let obj = { task: text, id: uid, color: color };
        taskArr.push(obj);
        localStorage.setItem("allTask", JSON.stringify(taskArr));
    }
    const taskFilter = div.querySelector(".task-filter");
    taskFilter.addEventListener("click", changeColor);
    div.addEventListener("click", removeTask);

    const taskTextDiv = div.querySelector(".task-text--div");
    taskTextDiv.addEventListener("keydown", editTask);

    const lockBtn = div.querySelector(".lock-btn");
    lockBtn.addEventListener("click", () => {
        handleLock(taskTextDiv, lockBtn);
    });
};

// delete task from ui
const removeTask = function (e) {
    let taskContainer = e.currentTarget;
    if (taskContainer.classList.contains("cursor-crosshair")) {
        let uid = taskContainer.querySelector(".task-id").innerText;
        for (let i = 0; i < taskArr.length; i++) {
            let { id } = taskArr[i];
            if ("#" + id == uid) {
                taskArr.splice(i, 1);
                localStorage.setItem("allTask", JSON.stringify(taskArr));
                taskContainer.remove();
                break;
            }
        }
    }
};

//edit task
const editTask = function (e) {
    let taskTextDiv = e.currentTarget;
    let uid = taskTextDiv.parentNode.children[0].innerText;
    for (let i = 0; i < taskArr.length; i++) {
        let { id } = taskArr[i];
        if ("#" + id == uid) {
            taskArr[i].task = taskTextDiv.innerText;
            localStorage.setItem("allTask", JSON.stringify(taskArr));
            break;
        }
    }
};

// delete mode on off
const toggleDeleteMode = function () {
    deleteBtn.classList.toggle("active");
    addBtn.classList.toggle("disabled");
    document.body.classList.toggle("cursor-not-allowed");
    const allTaskBox = document.querySelectorAll(".task-container");
    for (let task of allTaskBox) {
        task.classList.toggle("cursor-crosshair");
    }
};

const clearDisplay = function () {
    let allTask = document.querySelectorAll(".task-container");
    for (let t of allTask) {
        t.remove();
    }
};

// getting data from local storage
let taskArr = [];
const readData = function (colorFilter) {
    taskArr = [];
    if (localStorage.getItem("allTask")) {
        taskArr = JSON.parse(localStorage.getItem("allTask"));
        if (colorFilter) {
            clearDisplay();
            for (let i = 0; i < taskArr.length; i++) {
                let { id, color, task } = taskArr[i];
                if (color == colorFilter) {
                    createTask(color, task, false, id);
                }
            }
        } else {
            for (let i = 0; i < taskArr.length; i++) {
                let { id, color, task } = taskArr[i];
                createTask(color, task, false, id);
            }
        }
    }
};
readData();

//EVENTS
addBtn.addEventListener("click", openTaskCreator);
removeTaskCreatorBtn.addEventListener("click", closeTaskCreator);
deleteBtn.addEventListener("click", toggleDeleteMode);

for (let p of priority) {
    let color;
    p.addEventListener("click", (e) => {
        if (p.classList.contains("selected-border")) {
            p.classList.remove("selected-border");
            clearDisplay();
            readData();
            return;
        }
        priority.forEach((el) => el.classList.remove("selected-border"));

        p.classList.add("selected-border");
        color = p.classList[2];

        readData(color);
    });
}
