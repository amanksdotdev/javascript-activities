let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");

const addEventListeners = function () {
    let tasks = document.querySelectorAll(".task");
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].addEventListener("dblclick", (e) => {
            const el = e.target;
            console.log(el);
        });
    }
};

input.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        //getting value
        let task = input.value;
        //reseting input element
        input.value = "";

        //creating and adding li element
        let li = document.createElement("li");
        li.innerText = task;
        li.classList.add("task");
        ul.appendChild(li);

        //adding event of double click to remove
        li.addEventListener("dblclick", (e) => {
            li.remove();
        });
    }
});
